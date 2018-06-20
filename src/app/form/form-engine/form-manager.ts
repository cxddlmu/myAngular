import {
  FormGroup,
  FormArray,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Metadata } from "./metadata";
import * as R from "ramda";
import * as _ from "lodash";
import { Subscription } from "rxjs";
// import { DataValidator } from "./data-validator";
export class FormManager {
  duplicateFieldNames: any;
  constructor(
    private domainObj,
    private formGroup: FormGroup,
    private formConfig,
    private metaData: Metadata,
    private formBuilder: FormBuilder
  ) {
    this.initValidityFormConfig();

    this.initFormData();
  }
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
  private initFormData() {
    for (let controlKey in this.formGroup.controls) {
      this.setControlValWithDomainVal(
        this.domainObj[controlKey],
        this.formGroup.controls[controlKey]
      );
    }
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
          formGroup_sub
            .get(formCtrlKey_sub)
            .valueChanges.subscribe(formCtrlVal_sub => {
              this.setDomainValForObj(formCtrlKey_sub, formCtrlVal_sub);
              this.handleConditionalDefaultValue(
                formCtrlKey,
                index,
                formCtrlKey_sub
              );
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
        let compiledDefaultValConditionExpr = defaultValConditionExpr.replace(
          new RegExp(/{([^}]*)}/, "g"),
          "this.domainObj.$1"
        );

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
          if (
            typeof this.domainObj != "undefined" &&
            compiledDefaultValConditionExpr.indexOf("undefined") != 0
          ) {
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

  private handleConditionalDefaultValue() {
    let domainParent

    // 1. execute condition expressions
    let executedConditions = this.executeDefaultValueConditions(index, domainParent);//{country_province:[boolean]}
    // 2. handle conditional default values
    let 14f3w7rhWxJBLEBgQPstLE5PSb3GTQecED = this.defaultValueMetadata.conditional;
    if (14f3w7rhWxJBLEBgQPstLE5PSb3GTQecED) {
      for (let triggerFieldName in conditionalDefaultValueFields) {
        let triggerField = conditionalDefaultValueFields[triggerFieldName];//triggerField-{},triggerFieldName-addresses.country
        let arr = triggerFieldName.split('.');
        //console.warn('conditional default value 11111' + triggerField);
        if (triggerFieldName == currentTriggerControlKey || arr[1] == currentTriggerControlKey || arr[0] == currentTriggerControlKey) {
          for (let fieldName in triggerField) {//field-{},fieldName-addresses.postalCode
            let field = triggerField[fieldName];
            //console.warn('conditional default value 2222' + fieldName);
            let defaultValue;
            if (Array.isArray(field['value'])) {
              defaultValue = field['value'];
            } else {
              defaultValue = field['value'] && field['value'].split(',') || [''];
            }
            let requiredCondition = field['condition'] && field['condition'].split(',') || [];
            let isOverride = field['isOverride'];
            let isDisabled = field['isDisabled'];
            let maxLength = field['maxLength'];
            let partialMask = field['isPartialMask'];
            //console.warn('conditional default value aaaaaaaaaaaaa' + defaultValue);
            //console.warn('conditional default value bbbbbbbbbbbbb' + requiredCondition);
            //console.warn('conditional default value ccccccccccccc' + executedConditions[requiredCondition]);

            if (field['isOtherValue'] && field['isOtherValue'].length == 2) {
              const optionValue = this.validityMetadata[triggerFieldName].options.find(item => item.key == this.domainObj[triggerFieldName]);
              const otherValue = optionValue && optionValue.other || '';
              const [from, to] = field['isOtherValue'];
              const end = to == -1 ? otherValue.length - 1 : to;
              let value = end == from ? (otherValue[from] || '') : otherValue.slice(from, end + 1);
              if (isOverride && fromValueChange || (!isOverride && this.domainObj[fieldName] == "")) {
                this.formGroup.get(this.domain2FormMap.get(fieldName)).patchValue(value.trim(), { onlySelf: true });
              }
            }

            requiredCondition.forEach((reqCond, i) => {//reqCond-country_postalCode
              if (index != undefined) {
                let arr = fieldName.split('.');
                let domainArr = arr[0];
                let domainField = arr[1];
                if (executedConditions[reqCond] && executedConditions[reqCond][index] == true) {
                  if (typeof triggerField[fieldName]["section"] == 'undefined') {
                    let controlKey = this.domain2FormMap.get(domainArr);
                    if (controlKey) {//controlKey-addressDetailArray
                      let control: any = this.formGroup.get(controlKey).get(String(index)).get(domainField);
                      ////console.log(control);
                      //console.warn('conditional default value ddddddddddddd' + control || control.value);
                      if (defaultValue != undefined) {
                        this.patchValue(defaultValue, isOverride, fromValueChange, control, i, Array.isArray(field['value']));
                      }
                      if (isDisabled != undefined) {
                        let settingEntity = this.formConfig[domainField];
                        if (settingEntity['isDisableds']) {
                          settingEntity['isDisableds'][index] = isDisabled;
                        } else {
                          settingEntity['isDisableds'] = [];
                          settingEntity['isDisableds'][index] = isDisabled;
                        }
                      }
                      if (maxLength != undefined) {
                        let settingEntity = this.formConfig[domainField];
                        if (settingEntity['maxLengths']) {
                          settingEntity['maxLengths'][index] = maxLength;
                        } else {
                          settingEntity['maxLengths'] = [];
                          settingEntity['maxLengths'][index] = maxLength;
                        }
                      }
                      if (partialMask != undefined) {
                        let settingEntity = this.formConfig[domainField];
                        if (settingEntity['isPartialMask']) {
                          settingEntity['isPartialMask'][index] = partialMask;
                        } else {
                          settingEntity['isPartialMask'] = [];
                          settingEntity['isPartialMask'][index] = partialMask;
                        }
                      }
                    }
                  } else if (typeof triggerField[fieldName]["section"] != 'undefined' && typeof domainField == 'undefined') {
                    this.setSectionDefaultValue(triggerField, fieldName, defaultValue[i], isDisabled, domainArr, isOverride);
                  }
                }
              } else {
                if (executedConditions[reqCond] == true) {
                  let arr = fieldName.split('.');
                  let domainArr = arr[0];
                  if (typeof triggerField[fieldName]["section"] == 'undefined') {
                    let controlKey = this.domain2FormMap.get(domainArr);
                    if (controlKey) {
                      let control: any = this.formGroup.get(controlKey);
                      ////console.log(control);
                      if (isDisabled != undefined) {
                        let settingEntity = this.formConfig[domainArr];
                        settingEntity['isDisabled'] = isDisabled;
                      }
                      if (maxLength != undefined) {
                        let settingEntity = this.formConfig[domainArr];
                        settingEntity['maxLength'] = maxLength;
                      }
                      if (partialMask != undefined) {
                        let settingEntity = this.formConfig[domainArr];
                        settingEntity['isPartialMask'] = partialMask;
                      }
                      if (defaultValue != undefined) {
                        this.patchValue(defaultValue, isOverride, fromValueChange, control, i, Array.isArray(field['value']));
                      }
                      //console.warn('conditional default value ddddddddddddd' + control || control.value);
                    }
                  }
                  else if (typeof triggerField[fieldName]["section"] != 'undefined') {
                    this.setSectionDefaultValue(triggerField, fieldName, defaultValue[i], isDisabled, domainArr, isOverride);
                  }
                }
              }

            });

          }
          if (currentTriggerControlKey) {
            break;
          }
        }
      }
    }
  }
}
  private initConditionalDefaultValue() { }

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
  private setDomainValForFieldInArr(formArrayKey, formCtrlKey, formCtrlVal, index) {

}
  private initValueChangesSubscriptionForFormGroup(formGroup: FormGroup, formCtrlKey: string): void {
  formGroup.get(formCtrlKey).valueChanges.forEach((formCtrlVal: any) => {
    this.setDomainValForObj(formCtrlKey, formCtrlVal);

    if (formGroup.get(formCtrlKey) instanceof FormArray) {
      this.initValueChangesSubscriptionForFormArray(formGroup, formCtrlKey); //new item
    } else {
      this.initConditionalDefaultValue();
    }
  });
}
}
