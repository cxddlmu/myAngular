import { FormGroup, FormArray, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Metadata } from "./metadata";
import * as R from "ramda";
import * as _ from "lodash";
import { Subscription } from "rxjs";
// import { DataValidator } from "./data-validator";
export class FormManager {
  k;
  duplicateFieldNames: any;
  constructor(private domainObj, private formGroup: FormGroup, private formConfig, private metaData: Metadata, private formBuilder: FormBuilder, private refData) {
    this.initValidityFormConfig();

    this.initFormDataValWithDomainVal();
  }
  private iterateForm(ctrl: AbstractControl, ctrlVal, callback?) {
    if (ctrl instanceof FormGroup) {
      if (_.isEmpty(ctrlVal)) {
        return;
      }
      let formCtrl = ctrl;
      for (let formCtrlKey in formCtrl.controls) {
        this.iterateForm(formCtrl.get(formCtrlKey), ctrlVal[formCtrlKey], callback);
      }
    } else if (ctrl instanceof FormArray) {
      if (Array.isArray(ctrlVal) && ctrlVal.length == 0) {
        return;
      }
      let index = 0;
      let formArrayCtrl = ctrl as FormArray;
      for (let item of ctrlVal) {
        let formArrayCtrlCnt = formArrayCtrl.controls.length - 1;
        if (formArrayCtrlCnt < index) {
          formArrayCtrl.push(new FormGroup(formArrayCtrl.at(0).value));
        }
        this.iterateForm(formArrayCtrl.at(index), item);
        index++;
      }
    } else {
      callback(ctrl, ctrlVal);
    }
  }
  // private setDefaultVal(metadata, ctrl: AbstractControl) {
  //   let callback = function (ctrl, ctrlVal){
  //     ctrl.patchValue(ctrlVal);
  //   }
  //   this.iterateForm(ctrl, metadata, callback);
  // }

  private initValidityFormConfig() {
    let validityMetadata = this.metaData.getValidityMetadata();
    for (let formCtrlKey in validityMetadata) {
      if (formCtrlKey) {
        let settingEntity = this.formConfig[formCtrlKey];
        let validityRecord = validityMetadata[formCtrlKey];
        for (let validityKey in validityRecord) {
          settingEntity[validityKey] = validityRecord[validityKey];
        }
      }
    }
  }
  private initFormDataValWithDomainVal() {
    let callback = function(ctrl, ctrlVal) {
      ctrl.patchValue(ctrlVal);
    };
    this.iterateForm(this.formGroup, this.domainObj, callback);
  }
  /**
   *
   * @param domainVal
   * @param control
   *
   * formgroup---field(type:primitive,array)
   *          |--field--formArray--formgroup---field(type:primitive,array)
   */
  setControlValWithDomainVal(domainVal, control: AbstractControl) {
    if (control instanceof FormGroup) {
      if (_.isEmpty(domainVal)) {
        return;
      }
      for (let key in control.controls) {
        this.setControlValWithDomainVal(domainVal[key], control.get(key));
      }
    } else if (control instanceof FormArray) {
      if (!Array.isArray(domainVal) || domainVal.length == 0) {
        return;
      }
      let index = 0;
      for (let item of domainVal) {
        let formArray = control;
        if (index > 0) {
          formArray.push(this.formBuilder.group(formArray.at(0).value));
        }
        this.setControlValWithDomainVal(item, formArray.at(index));
        index++;
      }
    } else {
      control.patchValue(domainVal);
    }
  }
  dataValidator;
  public init() {
    // this.dataValidator = new DataValidator(
    //   this.domainObj,
    //   this.formConfig,
    //   this.metaData
    // );

    // 4. reset mandatory properties
    // console.warn("????" + "resetMandatoryProperties-beg");
    this.dataValidator.initMandatoryConfig();
    // console.warn("????" + "resetMandatoryProperties-end");
    // 5. pre check completeness status   , domain
    this.dataValidator.validateCompleteness();
    // console.warn("????" + "validateCompleteness-end");
    this.duplicateFieldNames = this.dataValidator.validateUniquevalue();
    // 6. initialize form with value change handlers and set domain value
    this.initValueChangesSubscription(this.formGroup);
    // 7. set default values
    // this.initDefaultValueSetting();

    //this.initArrayDefaultValue(this.formGroup, this.formConfig);
  }
  private initValueChangesSubscription(fromGroup: FormGroup): void {
    for (let formCtrlKey in fromGroup.controls) {
      if (fromGroup.get(formCtrlKey) instanceof FormArray) {
        this.initValueChangesSubscriptionForFormArray(fromGroup, formCtrlKey);
      }
      this.initValueChangesSubscriptionForFormGroup(fromGroup, formCtrlKey);
    }
  }
  private initValueChangesSubscriptionForFormGroup(formGroup: FormGroup, formCtrlKey: string): void {
    formGroup.get(formCtrlKey).valueChanges.forEach((formCtrlVal: any) => {
      this.setDomainValForObj(formCtrlKey, formCtrlVal);

      if (formGroup.get(formCtrlKey) instanceof FormArray) {
        this.initValueChangesSubscriptionForFormArray(formGroup, formCtrlKey); //new item
      } else if (formGroup.get(formCtrlKey) instanceof FormGroup) {
      } else {
        this.initConditionalDefaultValue();
      }
    });
  }
  private initValueChangesSubscriptionForFormArray(formGroup, formArrayKey): void {
    //todo
    let formArray = formGroup.get(formArrayKey);
    let subscription: Subscription;
    if (formArray instanceof FormArray) {
      subscription.unsubscribe();
    }
    (formArray as FormArray).controls.forEach((formGroup_sub, index, a) => {
      for (let formCtrlKey_sub in (formGroup_sub as FormGroup).controls) {
        subscription.add(
          formGroup_sub.get(formCtrlKey_sub).valueChanges.subscribe(formCtrlVal_sub => {
            this.setDomainValForObj(formCtrlKey_sub, formCtrlVal_sub);
            // this.handleConditionalDefaultValue(formCtrlKey, index, formCtrlKey_sub);
            this.dataValidator.validateCompleteness(index, formCtrlKey);
          })
        );
      }
    });
  }

  private executeDefaultValueConditions(index?, domainField?) {
    let executedConditions = {};
    let defaultValConditions = this.metaData.getDefaultValueMetadata().conditions;
    if (defaultValConditions) {
      for (let defaultValCondition in defaultValConditions) {
        let defaultValConditionExpr = defaultValConditions[defaultValCondition];
        let compiledDefaultValConditionExpr = defaultValConditionExpr.replace(new RegExp(/{([^}]*)}/, "g"), "this.domainObj.$1");

        let condValue = "";
        if (typeof this.domainObj != "undefined" && compiledDefaultValConditionExpr.indexOf("undefined") != 0) {
          if (domainField) {
            let param = domainField;
            if (param && eval("this.domainObj." + param) != undefined) {
              condValue = eval(compiledDefaultValConditionExpr);
            }
          }
        }
        if (index != undefined) {
          //array
          if (executedConditions[defaultValCondition] == undefined) {
            let arr = [];
            arr[index] = condValue;
            executedConditions[defaultValCondition] = arr;
          } else {
            executedConditions[defaultValCondition][index] = condValue;
          }
        } else {
          let condValue = "";
          if (typeof this.domainObj != "undefined" && compiledDefaultValConditionExpr.indexOf("undefined") != 0) {
            if (compiledDefaultValConditionExpr.indexOf("[index]") < 0) {
              condValue = eval(compiledDefaultValConditionExpr);
            }
          }
          executedConditions[defaultValCondition] = condValue;
        }
      }
    }

    return executedConditions;
  }

  private initConditionalDefaultValue() {}

  private setDomainValForObj(formCtrlKey, formCtrlVal) {
    this.domainObj[formCtrlKey] = formCtrlVal;
  }

  private setDomainValForArr(formArrayKey, formCtrlKey, formCtrlVal, index) {
    if (this.domainObj[formArrayKey] && this.domainObj[formArrayKey][index]) {
      this.domainObj[formArrayKey][index][formCtrlKey] = formCtrlVal;
    } else {
      if (!Array.isArray(this.domainObj[formArrayKey])) {
        this.domainObj[formArrayKey] = [];
      }

      this.domainObj[formArrayKey].push({
        formCtrlKey: formCtrlVal
      });
    }
  }
  private setDomainValForFieldInArr(formArrayKey, formCtrlKey, formCtrlVal, index) {}
}
