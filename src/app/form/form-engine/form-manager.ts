// import { FormGroup, FormArray, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";
// import { Metadata } from "./metadata";
// import * as R from "ramda";
// import * as _ from "lodash";
// import { Subscription } from "rxjs";
// // import { DataValidator } from "./data-validator";
// export class FormManager {
//   duplicateFieldNames: any;
//   constructor(private domainObj, private formGroup: FormGroup, private formConfig, private metadata: Metadata, private formBuilder: FormBuilder, private refData) {
//     //1.if config file is separated, combat them
//     this.initValidityFormConfig();
//     //2.
//     this.initFormDataValWithDomainVal();
//   }
//   private setIsOptional(ctrlKey, ctrlVal) {
//     this.setEntityForObj(ctrlKey, ctrlVal, "isOptional");
//   }
//   private setMaxLength(ctrlKey, ctrlVal) {
//     this.setEntityForObj(ctrlKey, ctrlVal, "maxLength");
//   }
//   private setIsPartialMask(ctrlKey, ctrlVal) {
//     this.setEntityForObj(ctrlKey, ctrlVal, "isPartialMask");
//   }
//   private setIsDisabled(ctrlKey, ctrlVal) {
//     this.setEntityForObj(ctrlKey, ctrlVal, "isDisableds");
//   }

//   private setIsOptionals(ctrlKey, ctrlVal, index) {
//     this.setEntityForArr(ctrlKey, ctrlVal, index, "isOptional");
//   }
//   private setMaxLengths(ctrlKey, ctrlVal, index) {
//     this.setEntityForArr(ctrlKey, ctrlVal, index, "maxLength");
//   }
//   private setIsPartialMasks(ctrlKey, ctrlVal, index) {
//     this.setEntityForArr(ctrlKey, ctrlVal, index, "isPartialMask");
//   }
//   private setIsDisableds(ctrlKey, ctrlVal, index) {
//     this.setEntityForArr(ctrlKey, ctrlVal, index, "isDisableds");
//   }
//   private setEntityForObj(ctrlKey, ctrlVal, entityKey) {
//     this.formConfig[ctrlKey].settingEntity[entityKey] = ctrlVal;
//   }
//   private setEntityForArr(ctrlKey, ctrlVal, index, entityKey) {
//     let settingEntity = this.formConfig[ctrlKey];
//     if (settingEntity[entityKey]) {
//       settingEntity[entityKey][index] = ctrlVal;
//     } else {
//       settingEntity[entityKey] = [];
//       settingEntity[entityKey][0] = ctrlVal;
//     }
//   }

//   private iterateForm(ctrl: AbstractControl, ctrlVal, callback?) {
//     if (ctrl instanceof FormGroup) {
//       if (_.isEmpty(ctrlVal)) {
//         return;
//       }
//       let formCtrl = ctrl;
//       for (let formCtrlKey in formCtrl.controls) {
//         this.iterateForm(formCtrl.get(formCtrlKey), ctrlVal[formCtrlKey], callback);
//       }
//     } else if (ctrl instanceof FormArray) {
//       if (Array.isArray(ctrlVal) && ctrlVal.length == 0) {
//         return;
//       }
//       let index = 0;
//       let formArrayCtrl = ctrl as FormArray;
//       for (let item of ctrlVal) {
//         let formArrayCtrlCnt = formArrayCtrl.controls.length - 1;
//         if (formArrayCtrlCnt < index) {
//           formArrayCtrl.push(new FormGroup(formArrayCtrl.at(0).value));
//         }
//         this.iterateForm(formArrayCtrl.at(index), item);
//         index++;
//       }
//     } else {
//       callback(ctrl, ctrlVal);
//     }
//   }
//   // private setDefaultVal(metadata, ctrl: AbstractControl) {
//   //   let callback = function (ctrl, ctrlVal){
//   //     ctrl.patchValue(ctrlVal);
//   //   }
//   //   this.iterateForm(ctrl, metadata, callback);
//   // }

//   private initValidityFormConfig() {
//     let validityMetadata = this.metadata.getValidityMetadata();
//     for (let formCtrlKey in validityMetadata) {
//       if (formCtrlKey) {
//         let settingEntity = this.formConfig[formCtrlKey];
//         let validityRecord = validityMetadata[formCtrlKey];
//         for (let validityKey in validityRecord) {
//           settingEntity[validityKey] = validityRecord[validityKey];
//         }
//       }
//     }
//   }
//   private initFormDataValWithDomainVal() {
//     let callback = function(ctrl, ctrlVal) {
//       ctrl.patchValue(ctrlVal);
//     };
//     this.iterateForm(this.formGroup, this.domainObj, callback);
//   }
//   /**
//    *
//    * @param domainVal
//    * @param control
//    *
//    * formgroup---ctrlKey(type:primitive,array)
//    *          |--ctrlKey--formArray--formgroup---ctrlKey(type:primitive,array,json)
//    *          |--ctrlKey--formgroup--ctrlKey
//    */
//   // setControlValWithDomainVal(domainVal, control: AbstractControl) {
//   //   if (control instanceof FormGroup) {
//   //     if (_.isEmpty(domainVal)) {
//   //       return;
//   //     }
//   //     for (let key in control.controls) {
//   //       this.setControlValWithDomainVal(domainVal[key], control.get(key));
//   //     }
//   //   } else if (control instanceof FormArray) {
//   //     if (!Array.isArray(domainVal) || domainVal.length == 0) {
//   //       return;
//   //     }
//   //     let index = 0;
//   //     for (let item of domainVal) {
//   //       let formArray = control;
//   //       if (index > 0) {
//   //         formArray.push(this.formBuilder.group(formArray.at(0).value));
//   //       }
//   //       this.setControlValWithDomainVal(item, formArray.at(index));
//   //       index++;
//   //     }
//   //   } else {
//   //     control.patchValue(domainVal);
//   //   }
//   // }
//   dataValidator;
//   public init() {
//     // this.dataValidator = new DataValidator(
//     //   this.domainObj,
//     //   this.formConfig,
//     //   this.metaData,
//     //   this
//     // );

//     // 4. reset mandatory properties
//     this.dataValidator.initMandatoryConfig();
//     // 5. pre check completeness status   , domain
//     this.dataValidator.validateCompleteness();

//     this.duplicateFieldNames = this.dataValidator.validateUniquevalue();
//     // 6. initialize form with value change handlers and set domain value
//     // we still do not know if we can nest more array and formgroup, how the value will react, need to test
//     // when array field change, array changefirst , then formgroup change
//     // when add new filed, formgroup change first , then array change if pathvalue is called
//     this.initFormValueChangesSubscription(this.formGroup,this.domainObj);
//     // 7. set default values
//     this.initDefaultValueSetting();

//     //this.initArrayDefaultValue(this.formGroup, this.formConfig);
//   }
//   /**
//    * cxdteste
//    * @param formGroup
//    * @param domainObj
//    */
//   private initFormValueChangesSubscription(formGroup: FormGroup, domainObj) {
//     let formGroupValPrevious = _.cloneDeep(formGroup.value);
//     formGroup.valueChanges.subscribe(formGroupValCur => {
//       let diffResultArr = DeepDiff.diff(formGroupValPrevious, formGroupValCur);
//       formGroupValPrevious = _.cloneDeep(formGroupValCur);
//       if (Array.isArray(diffResultArr) && diffResultArr.length > 0) {
//         for (let diffResult of diffResultArr) {
//           if (!Array.isArray(diffResult.path) || diffResult.path.length <= 0) {
//             continue;
//           }
//           if (diffResult.kind == "E") {
//             //element and array edit

//             this.setDomainVal(diffResult, domainObj, diffResult.rhs);
//             //cal conditional default
//           } else if (diffResult.kind == "A") {
//             //array
//             //1. array new item 2. array del item
//             //when array, new item need default value

//             if (diffResult.item.kind == "D") {
//               domainObj = _.cloneDeep(formGroupValCur);
//             } else if (diffResult.item.kind == "N") {
//               domainObj = _.cloneDeep(formGroupValCur);
//             }
//           }
//           console.log(diffResult);
//           console.log(domainObj);
//         }
//       }
//     });
//   }
//   /**
//    *
//    * @param diffResult
//    * @param domainObj
//    * @param formGroupValCur
//    */
//   private setDomainVal(diffResult, domainObj, formGroupValCur) {
//     _.set(domainObj, diffResult.path, formGroupValCur);
//   }
//   private iterateDiffPath(formGroup, diffPathArr) {
//     for (let diffPath of diffPathArr) {
//       let formCtrlKey = diffPath;
//       if (formGroup.get(formCtrlKey) instanceof FormGroup) {
//       }
//     }
//   }
//   private getTriggerFormCtrlKey;

//   private initDefaultValueSetting() {
//     //cs
//     let metadata = this.metadata.getDefaultValueMetadata().static;
//     for (let controlKey in this.formGroup.value) {
//       this.iterateForm(metadata[controlKey], this.formGroup.get(controlKey));
//     }

//     let defaultValueStaticArr = this.metadata.getDefaultValueMetadata().static;
//     for (let defaultValueStatic of defaultValueStaticArr) {
//       this.setDefaultValueMetadataControl(defaultValueStatic, this.formGroup.get(defaultValueStatic));
//     }

//     // 2. handle conditional default values

//     // for (let controlKey in this.formGroup.controls) {
//     //   if (this.formGroup.controls[controlKey] instanceof FormArray) {
//     //     (<FormArray>this.formGroup.get(controlKey)).controls.forEach((v, i, a) => {
//     //       for (let controlKey_2 in v.value) {
//     //         this.handleConditionalDefaultValueSetting(controlKey_2, i, controlKey);
//     //       }
//     //     });
//     //   } else {
//     //     this.handleConditionalDefaultValueSetting(controlKey);
//     //   }
//     // }
//   }

//   // private initValueChangesSubscription(fromGroup: FormGroup): void {
//   //   for (let formCtrlKey in fromGroup.controls) {
//   //     if (fromGroup.get(formCtrlKey) instanceof FormArray) {
//   //       this.initValueChangesSubscriptionForFormArray(fromGroup, formCtrlKey);
//   //     }
//   //     this.initValueChangesSubscriptionForFormGroup(fromGroup, formCtrlKey);
//   //   }
//   // }
//   // private initValueChangesSubscriptionForFormGroup(formGroup: FormGroup, formCtrlKey: string): void {
//   //   formGroup.get(formCtrlKey).valueChanges.forEach((formCtrlVal: any) => {
//   //     this.setDomainValForObj(formCtrlKey, formCtrlVal);

//   //     if (formGroup.get(formCtrlKey) instanceof FormArray) {
//   //       this.initValueChangesSubscriptionForFormArray(formGroup, formCtrlKey); //new item
//   //     } else if (formGroup.get(formCtrlKey) instanceof FormGroup) {
//   //       this.initValueChangesSubscriptionForFormGroup(formGroup, formCtrlKey); //new item
//   //     } else {
//   //       this.initConditionalDefaultValue();
//   //     }
//   //   });
//   // }
//   // private initValueChangesSubscriptionForFormArray(formGroup, formArrayKey): void {
//   //   //todo
//   //   let formArray = formGroup.get(formArrayKey);
//   //   let subscription: Subscription;
//   //   if (formArray instanceof FormArray) {
//   //     subscription.unsubscribe();
//   //   }
//   //   (formArray as FormArray).controls.forEach((formGroupSub, index, a) => {
//   //     for (let formCtrlKeySub in (formGroupSub as FormGroup).controls) {
//   //       subscription.add(
//   //         formGroupSub.get(formCtrlKeySub).valueChanges.subscribe(formCtrlValSub => {
//   //           this.setDomainValForObj(formCtrlKeySub, formCtrlValSub);
//   //           // this.handleConditionalDefaultValue(formCtrlKey, index, formCtrlKeySub);
//   //           this.dataValidator.validateCompleteness(index, formCtrlKeySub);
//   //         })
//   //       );
//   //     }
//   //   });
//   // }

//   private execCondition(conditionExpr) {
//     let compiledConditionExpr = conditionExpr.replace(new RegExp(/{([^}]*)}/, "g"), "this.domainObj.$1");
//     if (compiledConditionExpr) {
//       return eval(compiledConditionExpr);
//     }
//   }

//   private execConditions(conditions) {
//     if (conditions) {
//       let execConditionsResult = {};
//       for (let condition in conditions) {
//         let conditionExpr = conditions[condition];
//         execConditionsResult[condition] = this.execCondition(conditionExpr);
//       }
//       return execConditionsResult;
//     }
//   }

//   private handleConditionalDefaultValue(triggerCtrlKey, formGroup) {
//     let defaultValConditionalCtrl = this.metadata.getDefaultValueMetadata().conditional;
//     let defaultValConditionsObj = this.metadata.getDefaultValueMetadata().conditions;
//     let triggerCtrlVal = defaultValConditionalCtrl[triggerCtrlKey];
//     for (let affectedCtlKey in triggerCtrlVal) {
//       let affectedCtlVals = triggerCtrlVal[affectedCtlKey];
//       for (let affectedCtlVal of affectedCtlVals) {
//         affectedCtlVal.isOverride;
//         if (this.execCondition(defaultValConditionsObj[affectedCtlVal.condition])) {
//           if (affectedCtlVal.value) {
//             this.setControlValWithDomainVal(affectedCtlVal.value, formGroup.get(affectedCtlKey));
//           }
//           if (affectedCtlVal.isDisabled) {
//             this.setIsDisabled(affectedCtlKey, affectedCtlVal.isDisabled);
//           }
//         }
//       }
//     }
//   }

//   private initConditionalDefaultValue() {}

//   private setDomainValForObj(formCtrlKey, formCtrlVal) {
//     this.domainObj[formCtrlKey] = formCtrlVal;
//   }

//   private setDomainValForArr(formArrayKey, formCtrlKey, formCtrlVal, index) {
//     if (this.domainObj[formArrayKey] && this.domainObj[formArrayKey][index]) {
//       this.domainObj[formArrayKey][index][formCtrlKey] = formCtrlVal;
//     } else {
//       if (!Array.isArray(this.domainObj[formArrayKey])) {
//         this.domainObj[formArrayKey] = [];
//       }

//       this.domainObj[formArrayKey].push({
//         formCtrlKey: formCtrlVal
//       });
//     }
//   }
//   private setDomainValForFieldInArr(formArrayKey, formCtrlKey, formCtrlVal, index) {}
// }
