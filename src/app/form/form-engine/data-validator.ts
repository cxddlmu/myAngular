// import * as _ from "lodash";
// import { Metadata } from "./metadata";
// import { AbstractControl, FormGroup, FormArray } from "@angular/forms/forms";
// //**when from domain to form we should handle it according to form */
// //**when from form to domain, just set it */
// export class DataValidator {
//   cnt_min_not: number;
//   cnt_max: number;
//   separator: string = "."; //#

//   constructor(
//     private domainObj,
//     private formGroup: FormGroup,
//     private formConfig?,
//     private metadata?: Metadata
//   ) { }
//   private setIsOptional(ctrlKey, ctrlVal) {
//     this.formConfig[ctrlKey].settingEntity["isOptional"] = ctrlVal;
//   }
//   private setIsOptionals(ctrlKey, ctrlVal, index) {
//     let settingEntity = this.formConfig[ctrlKey];
//     if (settingEntity["isOptionals"]) {
//       settingEntity["isOptionals"][index] = ctrlVal;
//     } else {
//       settingEntity["isOptionals"] = [];
//       settingEntity["isOptionals"][0] = ctrlVal;
//     }
//   }
//   public initStaticMandatoryConfig() {
//     let staticMandatoryFields = this.metadata.getCompletenessMetadata().static; //array
//     for (let controlKey in this.formConfig) {
//       if (
//         staticMandatoryFields &&
//         staticMandatoryFields.indexOf(controlKey) > -1
//       ) {
//         //mandatory==true
//         this.setIsOptional(controlKey, false);
//         this.formGroup.get(controlKey);
//       } else {
//         this.setIsOptional(controlKey, true);
//         let settingEntity = this.formConfig[controlKey];

//         if (settingEntity["isOptionals"]) {
//           (<Array<any>>settingEntity["isOptionals"]).forEach((v, i, a) => {
//             a[i] = true;
//           });
//         } else {
//           settingEntity["isOptionals"] = [];
//           settingEntity["isOptionals"][0] = true;
//         }
//       }
//     }
//   }
//   private initConditionalMandatoryConfig() { }

//   public initMandatoryConfig() {
//     let staticMandatoryFields = this.metadata.getCompletenessMetadata().static; //array
//     for (let controlKey in this.formConfig) {
//       let settingEntity = this.formConfig[controlKey];
//       if (
//         staticMandatoryFields &&
//         staticMandatoryFields.some(x => x.indexOf(controlKey) > -1)
//       ) {
//         //mandatory==true
//         this.setIsOptional(controlKey, false);
//         this.formGroup.get(controlKey);
//       } else {
//         settingEntity["isOptional"] = true;
//         if (settingEntity["isOptionals"]) {
//           (<Array<any>>settingEntity["isOptionals"]).forEach((v, i, a) => {
//             a[i] = true;
//           });
//         } else {
//           settingEntity["isOptionals"] = [];
//           settingEntity["isOptionals"][0] = true;
//         }
//       }
//     }

//     // 3. mark conditional mandatory fields
//     let conditionalMandatoryMap = this.metadata.getCompletenessMetadata().conditional;
//     // let conditionsMandatoryMap = this.metadata.getCompletenessMetadata().conditions;
//     if (conditionalMandatoryMap) {
//       for (let conditionalMandatoryKey in conditionalMandatoryMap) {
//         let conditionalMandatoryVals = conditionalMandatoryMap[
//           conditionalMandatoryKey
//         ] as Array<any>;
//         let conditionalMandatoryKeySplitArr = conditionalMandatoryKey.split(
//           this.separator
//         );
//         if (conditionalMandatoryKeySplitArr.length == 1) {
//           // 1 execute condition expressions
//           // if (conditionsMandatoryMap) {
//           for (let conditionalMandatoryVal of conditionalMandatoryVals) {
//             let conditionsMandatoryKey = conditionalMandatoryVal;
//             // let conditionsMandatoryVal = conditionsMandatoryMap.get(conditionsMandatoryKey)
//             let result = this.executeCompletenessConditionsForObj(
//               conditionsMandatoryKey
//             );
//             let settingEntity = this.formConfig[conditionalMandatoryKey];
//             if (result == true) {
//               settingEntity["isOptional"] = false;
//             } else {
//               settingEntity["isOptional"] = true;
//             }
//           }
//           // }
//         } else if (conditionalMandatoryKeySplitArr.length == 2) {
//           // 1 execute condition expressions
//           for (let conditionalMandatoryVal of conditionalMandatoryVals) {
//             // let conditionsMandatoryVal = conditionsMandatoryMap.get(conditionalMandatoryVal)
//             let domainVals = this.domainObj[conditionalMandatoryKeySplitArr[0]];
//             if (Array.isArray(domainVals)) {
//               let domainValIndex = 0;
//               for (let domainVal of domainVals) {
//                 let result = this.executeCompletenessConditionsForArr(
//                   conditionalMandatoryVal,
//                   domainValIndex,
//                   conditionalMandatoryKeySplitArr[0]
//                 );
//                 let settingEntity = this.formConfig[conditionalMandatoryKey];
//                 if (result == true) {
//                   if (!settingEntity["isOptionals"]) {
//                     settingEntity["isOptionals"] = [];
//                   }
//                   settingEntity["isOptionals"][domainValIndex] = false;
//                 }
//                 domainValIndex++;
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   private executeCompletenessConditionsForArr(
//     conditionsMandatoryKey,
//     index: number,
//     key
//   ): boolean {
//     let conditionsMandatoryMap = this.metadata.getCompletenessMetadata()
//       .conditions;
//     if (!conditionsMandatoryMap) {
//       return false;
//     }
//     let conditionsMandatoryVal = conditionsMandatoryMap.get(
//       conditionsMandatoryKey
//     );
//     let compiledConditionsMandatoryVal = this.executeCompletenessRegex(
//       conditionsMandatoryVal
//     );
//     if (index != undefined) {
//       let cnt = this.domainObj[key].length; //calculate array length
//       for (let index = 0; index < cnt; index++) {
//         //eval all the condition in array
//         if (
//           typeof this.domainObj != "undefined" &&
//           compiledConditionsMandatoryVal.indexOf("undefined") != 0
//         ) {
//           if (key) {
//             if (key && eval("this.domainObj." + key) != undefined) {
//               return eval(compiledConditionsMandatoryVal);
//             }
//           }
//         }
//       }
//     }
//   }
//   private executeCompletenessConditionsForObj(conditionsMandatoryKey): boolean {
//     //addresses
//     let conditionsMandatoryMap = this.metadata.getCompletenessMetadata()
//       .conditions;
//     if (!conditionsMandatoryMap) {
//       return false;
//     }
//     let conditionsMandatoryVal = conditionsMandatoryMap.get(
//       conditionsMandatoryKey
//     );
//     let compiledConditionsMandatoryVal = this.executeCompletenessRegex(
//       conditionsMandatoryVal
//     );
//     if (
//       typeof this.domainObj != "undefined" &&
//       compiledConditionsMandatoryVal.indexOf("undefined") != 0
//     ) {
//       return eval(compiledConditionsMandatoryVal);
//     }
//   }
//   private executeCompletenessRegex(conditionsMandatoryVal) {
//     return conditionsMandatoryVal.replace(
//       new RegExp(/{([^}]*)}/, "g"),
//       (match, token) => {
//         let tokens = token.split(this.separator);
//         if (tokens.length == 1) {
//           return `this.domainObj.${tokens[0]}`;
//         } else {
//           if (tokens[0].indexOf("index") >= 0) {
//             return `this.domainObj.${token}`;
//           } else {
//             let value = this.domainObj[tokens[0]];
//             return `this.formConfig.${
//               tokens[0]
//               }.options.find(function(item){return item.key=="${value}";}) && this.formConfig.${
//               tokens[0]
//               }.options.find(function(item){return item.key=="${value}";}).${
//               tokens[1]
//               }`;
//           }
//         }
//       }
//     );
//   }

//   private validateCompletenetssForObj(
//     formControlKey: string,
//     formGroup: FormGroup
//   ): void {
//     formGroup
//       .get(formControlKey)
//       .updateValueAndValidity({ onlySelf: true, emitEvent: false });
//     let result = this.executeCompletenessConditionsForObj(formControlKey);
//     let settingEntity = this.formConfig[formControlKey];
//     if (result == true) {
//       settingEntity["isOptional"] = false;
//     } else {
//       settingEntity["isOptional"] = true;
//     }
//   }
//   private validateCompletenetssForArr(
//     formControlKey: string,
//     formArrayKey: string,
//     index: number,
//     formGroup: FormGroup
//   ): void {
//     (formGroup.get(formArrayKey) as FormArray)
//       .at(index)
//       .get(formControlKey)
//       .updateValueAndValidity({ onlySelf: true, emitEvent: false });
//     let compiledConditionsMandatoryVal = this.executeCompletenessRegex(
//       formArrayKey
//     );
//     if (index != undefined) {
//       let cnt = this.domainObj[key].length; //calculate array length
//       for (let index = 0; index < cnt; index++) {
//         //eval all the condition in array
//         if (
//           typeof this.domainObj != "undefined" &&
//           compiledConditionsMandatoryVal.indexOf("undefined") != 0
//         ) {
//           if (key) {
//             if (key && eval("this.domainObj." + key) != undefined) {
//               return eval(compiledConditionsMandatoryVal);
//             }
//           }
//         }
//       }
//     }
//   }
//   public validateCompleteness(
//     index?,
//     controlKeyParent?,
//     formGroup?: FormGroup
//   ): Array<any> {
//     // let missingMandatoryFieldNames = [];
//     // let domainParent

//     // 1. reset uncompleted count
//     // console.log(this.domainObj);
//     // if (typeof this.domainObj == 'undefined' || this.domainObj == '') {//reset
//     //     this.domainObj = {
//     //         uncompletedCount: -1
//     //     }
//     // } else {
//     //     this.domainObj.uncompletedCount = -1;
//     // }
//     // if (controlKeyParent) {
//     //     domainParent = this.form2DomainMap.get(controlKeyParent).objField;//addresses
//     // }

//     // 3. validate static mandatory fields
//     let staticMandatoryFields = this.metadata.getCompletenessMetadata().static;
//     if (staticMandatoryFields) {
//       for (let staticMandatoryField of staticMandatoryFields) {
//         let staticMandatoryFieldSplits = staticMandatoryField.split(
//           this.separator
//         ) as Array<any>;
//         let formControlKey;
//         let formArrayKey;
//         if (staticMandatoryFieldSplits) {
//           if (staticMandatoryFieldSplits.length == 1) {
//             formControlKey = staticMandatoryFieldSplits[0];
//           } else if (staticMandatoryFieldSplits.length == 2) {
//             formArrayKey = staticMandatoryFieldSplits[0];
//             formControlKey = staticMandatoryFieldSplits[1];
//           }
//         }
//         if (!formArrayKey && formControlKey) {
//           formGroup
//             .get(formControlKey)
//             .updateValueAndValidity({ onlySelf: true, emitEvent: false });
//         } else if (formArrayKey && formControlKey) {
//           (formGroup.get(formArrayKey) as FormArray)
//             .at(index)
//             .get(formControlKey)
//             .updateValueAndValidity({ onlySelf: true, emitEvent: false });
//         }

//         // if (_fieldName.length == 1) {
//         // check field value
//         // if (!this.domainObj[_fieldName[0]] || (this.domainObj[_fieldName[0]] && this.domainObj[_fieldName[0]].length == 0)) {
//         //console.warn('Missing Static Mandatory Field=' + _fieldName[0]);
//         // missingMandatoryFieldNames.push(_fieldName[0]);
//         // this.domainObj.uncompletedCount = this.domainObj.uncompletedCount == -1 ? 1 : this.domainObj.uncompletedCount + 1;
//         // }
//         // } else if (_fieldName.length >= 2) {
//         //     if (typeof this.domainObj != 'undefined' && typeof this.domainObj[_fieldName[0]] != 'undefined') {
//         //         this.cnt_max = 0;
//         //         this.cnt_min_not = 0;
//         //         this.domainObj[_fieldName[0]].forEach((value, index_1) => {
//         //             if (!value[_fieldName[1]]) {
//         //                 if (_fieldName[2] == 'last') {
//         //                     this.cnt_max++;
//         //                 }
//         //                 //console.warn('Missing Static Mandatory Field=' + _fieldName[0] + '.' + index + '-' + _fieldName[1]);
//         //                 let obj = {};
//         //                 obj[_fieldName[0]] = index_1 + '.' + _fieldName[1];
//         //                 missingMandatoryFieldNames.push(obj);
//         //                 this.domainObj.uncompletedCount = this.domainObj.uncompletedCount == -1 ? 1 : this.domainObj.uncompletedCount + 1;
//         //             }
//         //         });

//         //     }
//         // }
//       }

//       // staticMandatoryFields.forEach(
//       //     (fieldName: string) => {

//       // });
//     }

//     // for (let formFieldName in this.formConfig) {
//     //     let domainRecord = this.form2DomainMap.get(formFieldName);
//     //     if (domainRecord) {
//     //         let fieldName = domainRecord.objField;
//     //         let settingEntity = this.formConfig[formFieldName];
//     //         if (staticMandatoryFields && staticMandatoryFields.some(x => { return x.indexOf(fieldName) > -1 })) {//mandatory==true
//     //             if (!settingEntity["isOptionals"]) {
//     //                 settingEntity["isOptionals"] = [];
//     //             }
//     //             settingEntity["isOptionals"][index] = false;
//     //         } else {
//     //             if (!settingEntity["isOptionals"]) {
//     //                 settingEntity["isOptionals"] = [];
//     //             }
//     //             settingEntity["isOptionals"][index] = true;
//     //         }
//     //     }
//     // }
//     //console.log(missingMandatoryFieldNames)
//     //console.log("validate static mandatory fields");
//     //console.log(this.domainObj)

//     // 4. validate conditional mandatory fields
//     let conditionalMandatoryFields = this.completenessMetadata.conditional;
//     if (conditionalMandatoryFields) {
//       for (let fieldName in conditionalMandatoryFields) {
//         //fieldName-addresses.postalCode
//         let _fieldName = fieldName.split(this.splitString);

//         let requiredConditions = conditionalMandatoryFields[fieldName];
//         let isAnyConditionMatched = false;
//         for (let i = 0; i < requiredConditions.length; i++) {
//           //requiredConditions-['countryValueChange']
//           // one condition is matched
//           //if (executedConditions[requiredConditions[i]] == true || executedConditions[requiredConditions[i]] && executedConditions[requiredConditions[i]][index] == true) {
//           // mark conditional mandatory fields to mandatory
//           if (this.formConfig && this.form2DomainMap && this.domain2FormMap) {
//             if (_fieldName.length == 1) {
//               // 2. execute condition expressions
//               let executedConditions = this.executeCompletenessConditions();
//               if (executedConditions[requiredConditions[i]] == true) {
//                 let controlKey = this.domain2FormMap.get(fieldName);
//                 if (controlKey) {
//                   let settingEntity = this.formConfig[controlKey];
//                   settingEntity["isOptional"] = false;
//                 }
//                 // check field value
//                 if (
//                   !this.domainObj[fieldName] ||
//                   (this.domainObj[fieldName] &&
//                     this.domainObj[fieldName].length == 0)
//                 ) {
//                   //console.warn('Missing Conditional Mandatory Field=' + fieldName);
//                   missingMandatoryFieldNames.push(fieldName);
//                   this.domainObj.uncompletedCount =
//                     this.domainObj.uncompletedCount == -1
//                       ? 1
//                       : this.domainObj.uncompletedCount + 1;
//                 }
//                 isAnyConditionMatched = true;
//               }
//             } else if (_fieldName.length == 2) {
//               if (
//                 typeof this.domainObj != "undefined" &&
//                 typeof this.domainObj[_fieldName[0]] != "undefined"
//               ) {
//                 (<Array<any>>this.domainObj[_fieldName[0]]).forEach(
//                   (value, index_2, a) => {
//                     //array iterate
//                     // 2. execute condition expressions
//                     let indexParam;
//                     if (index) {
//                       indexParam = index_2;
//                     } else {
//                       indexParam = index_2;
//                     }
//                     let domainField;
//                     if (domainParent) {
//                       domainField = domainParent;
//                     } else {
//                       domainField = _fieldName[0];
//                     }
//                     let executedConditions = this.executeCompletenessConditions(
//                       indexParam,
//                       domainField
//                     );
//                     if (
//                       executedConditions[requiredConditions[i]] &&
//                       executedConditions[requiredConditions[i]][index_2] &&
//                       executedConditions[requiredConditions[i]][index_2] == true
//                     ) {
//                       let controlKey = this.domain2FormMap.get(_fieldName[1]);
//                       if (controlKey) {
//                         let settingEntity = this.formConfig[controlKey];
//                         if (!settingEntity["isOptionals"]) {
//                           settingEntity["isOptionals"] = [];
//                         }
//                         settingEntity["isOptionals"][index_2] = false;
//                       }
//                       //this.domainObj[_fieldName[0]].forEach((value, index_1) => {//_fieldName[0]-addresses, [1]-postalcode
//                       if (!value[_fieldName[1]]) {
//                         //empty
//                         //console.warn('Missing Static Mandatory Field=' + _fieldName[0] + '.' + index + '-' + _fieldName[1]);
//                         let obj = {};
//                         obj[_fieldName[0]] = index_2 + "." + _fieldName[1];
//                         missingMandatoryFieldNames.push(obj);
//                         this.domainObj.uncompletedCount =
//                           this.domainObj.uncompletedCount == -1
//                             ? 1
//                             : this.domainObj.uncompletedCount + 1;
//                       }
//                       // });
//                     } else {
//                       let controlKey = this.domain2FormMap.get(_fieldName[1]);
//                       if (controlKey) {
//                         let settingEntity = this.formConfig[controlKey];
//                         if (settingEntity["isOptionals"]) {
//                           settingEntity["isOptionals"][index_2] = true;
//                         } else {
//                           settingEntity["isOptionals"] = [];
//                           settingEntity["isOptionals"][index_2] = true;
//                         }
//                       }
//                     }
//                   }
//                 );
//                 // if (isAnyConditionMatched) {
//                 //     this.domainObj[_fieldName[0]].forEach((value, index_1) => {//_fieldName[0]-addresses, [1]-postalcode
//                 //         if (!value[_fieldName[1]]) {//empty
//                 //             //console.warn('Missing Static Mandatory Field=' + _fieldName[0] + '.' + index + '-' + _fieldName[1]);
//                 //             let obj = {};
//                 //             obj[_fieldName[0]] = index_1 + '.' + _fieldName[1];
//                 //             missingMandatoryFieldNames.push(obj);
//                 //             this.domainObj.uncompletedCount = this.domainObj.uncompletedCount == -1 ? 1 : this.domainObj.uncompletedCount + 1;
//                 //         }
//                 //     });
//                 // }
//               }
//             }
//           }

//           // if (isAnyConditionMatched) {
//           //     break;//||
//           // }
//           //}
//         }
//         // if (!isAnyConditionMatched) {//for plain field
//         //     // mark conditional mandatory fields to optional ,as not match
//         //     if (this.formConfig && this.form2DomainMap && this.domain2FormMap) {
//         //         if (_fieldName.length == 1) {
//         //             let controlKey = this.domain2FormMap.get(fieldName);
//         //             if (controlKey) {
//         //                 let settingEntity = this.formConfig[controlKey];
//         //                 settingEntity["isOptional"] = true;
//         //             }
//         //         }
//         //         // } else if (_fieldName.length == 2) {
//         //         //     let controlKey = this.domain2FormMap.get(_fieldName[1]);//postalCode
//         //         //     if (controlKey) {
//         //         //         let settingEntity = this.formConfig[controlKey];
//         //         //         settingEntity["isOptionals"][index] = true;
//         //         //     }
//         //         // }
//         //     }
//         // }
//       }
//     }

//     // 5. clear uncompleted count for completeness
//     // if (this.domainObj.uncompletedCount == -1) {
//     //     this.domainObj.uncompletedCount = 0;
//     // }

//     // let count = 0;
//     // for (let item in this.formConfig) {
//     //     if (this.formConfig[item].onchange && typeof this.formConfig[item].onchange == 'function') {
//     //         let result = missingMandatoryFieldNames.find(fieldName => fieldName == item);
//     //         this.formConfig[item].onchange(() => {
//     //             if (result == undefined && this.formConfig[item]['hasError'] === true) {
//     //                 console.log(this.formConfig[item]);
//     //                 count++;
//     //             }
//     //         })
//     //     }
//     // }
//     // this.domainObj.uncompletedCount = missingMandatoryFieldNames.length + count;
//     // if (this.cnt_max > 0) {
//     //     this.domainObj.uncompletedCount = this.domainObj.uncompletedCount == -1 ? 1 : this.domainObj.uncompletedCount - (this.cnt_max - 1);
//     // }
//     // console.warn("Missing Mandatory Fields: " + missingMandatoryFieldNames.length);
//     // console.warn("Missing Mandatory Fields: " + JSON.stringify(missingMandatoryFieldNames));

//     // return missingMandatoryFieldNames;
//   }
// }
