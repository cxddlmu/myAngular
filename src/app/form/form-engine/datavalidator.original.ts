// import { Hashtable } from "../model/data-model";
// import * as _ from "lodash";

// export class DataValidator {
//   cnt_min_not: number;
//   cnt_max: number;
//   splitString: string = ".";

//   constructor(
//     private domainObj,
//     private completenessMetadata,
//     private uniquevalueMetadata?,
//     private formConfig?,
//     private form2DomainMap?: Hashtable,
//     private domain2FormMap?: Hashtable
//   ) {}

//   // public refresh(completenessMetadata) {
//   //     this._completenessMetadata = completenessMetadata;
//   // }

//   public resetMandatoryProperties() {
//     if (this.formConfig && this.form2DomainMap && this.domain2FormMap) {
//       // 2. mark static mandatory fields
//       let staticMandatoryFields = this.completenessMetadata.static; //array
//       //console.log(staticMandatoryFields)
//       for (let formFieldName in this.formConfig) {
//         let domainRecord = this.form2DomainMap.get(formFieldName);
//         if (domainRecord) {
//           let fieldName = domainRecord.objField;
//           let settingEntity = this.formConfig[formFieldName];
//           if (
//             staticMandatoryFields &&
//             staticMandatoryFields.some(x => {
//               return x.indexOf(fieldName) > -1;
//             })
//           ) {
//             //mandatory==true
//             settingEntity["isOptional"] = false;
//             if (settingEntity["isOptionals"]) {
//               (<Array<any>>settingEntity["isOptionals"]).forEach((v, i, a) => {
//                 a[i] = false;
//               });
//             } else {
//               settingEntity["isOptionals"] = [];
//               settingEntity["isOptionals"][0] = false;
//             }
//           } else {
//             settingEntity["isOptional"] = true;
//             if (settingEntity["isOptionals"]) {
//               (<Array<any>>settingEntity["isOptionals"]).forEach((v, i, a) => {
//                 a[i] = true;
//               });
//             } else {
//               settingEntity["isOptionals"] = [];
//               settingEntity["isOptionals"][0] = true;
//             }
//           }
//         }
//       }

//       // for (let controlKey in this.formGroup.controls) {
//       //     if (this.formGroup.controls[controlKey] instanceof FormArray) {
//       //         (<FormArray>this.formGroup.get(controlKey)).controls.forEach((v, i, a) => {
//       //             for (let controlKey_2 in v.value) {
//       //                 this.handleConditionalDefaultValueSetting(controlKey_2, i, controlKey);
//       //             }
//       //         })
//       //     } else {
//       //         this.handleConditionalDefaultValueSetting();
//       //     }
//       // }

//       // 3. mark conditional mandatory fields
//       let conditionalMandatoryFields = this.completenessMetadata.conditional;
//       if (conditionalMandatoryFields) {
//         for (let fieldName in conditionalMandatoryFields) {
//           let _fieldName = fieldName.split(this.splitString);
//           let requiredConditions = conditionalMandatoryFields[fieldName];
//           if (_fieldName.length == 1) {
//             // 1 execute condition expressions
//             let executedConditions = this.executeCompletenessConditions();
//             for (let i = 0; i < requiredConditions.length; i++) {
//               // one condition is matched
//               if (executedConditions[requiredConditions[i]] == true) {
//                 let controlKey = this.domain2FormMap.get(fieldName);
//                 if (controlKey) {
//                   let settingEntity = this.formConfig[controlKey];
//                   settingEntity["isOptional"] = false;
//                 }
//               }
//             }
//           } else if (_fieldName.length == 2) {
//             // 1 execute condition expressions
//             for (let i = 0; i < requiredConditions.length; i++) {
//               if (Array.isArray(this.domainObj[_fieldName[0]])) {
//                 this.domainObj[_fieldName[0]].forEach((value, index_1) => {
//                   let executedConditions = this.executeCompletenessConditions(
//                     index_1,
//                     _fieldName[0]
//                   );
//                   if (
//                     executedConditions[requiredConditions[i]] &&
//                     executedConditions[requiredConditions[i]][index_1] == true
//                   ) {
//                     //console.warn('Missing Static Mandatory Field=' + _fieldName[0] + '.' + index + '-' + _fieldName[1]);
//                     let controlKey = this.domain2FormMap.get(_fieldName[1]);
//                     if (controlKey) {
//                       let settingEntity = this.formConfig[controlKey];
//                       if (!settingEntity["isOptionals"]) {
//                         settingEntity["isOptionals"] = [];
//                       }
//                       settingEntity["isOptionals"][index_1] = false;
//                     }
//                   }
//                 });
//               }
//             }
//           }
//         }
//       }
//     }
//   }

//   public validateUniquevalue(): Array<any> {
//     let duplicateFieldNames = [];

//     if (this.uniquevalueMetadata) {
//       let staticMandatoryFields = this.uniquevalueMetadata.static;
//       if (staticMandatoryFields) {
//         staticMandatoryFields.forEach((fieldName: string) => {
//           let _fieldName = fieldName.split(this.splitString);
//           if (_fieldName.length == 2) {
//             let arraylist = new Hashtable();
//             if (this.domainObj[_fieldName[0]]) {
//               this.domainObj[_fieldName[0]].forEach((value, index) => {
//                 let obj = {};

//                 if (value[_fieldName[1]]) {
//                   if (arraylist.containsKey(value[_fieldName[1]])) {
//                     obj[_fieldName[0]] = index + "." + _fieldName[1];
//                     duplicateFieldNames.push(obj);
//                   } else {
//                     arraylist.put(value[_fieldName[1]], index);
//                   }
//                 }
//               });
//             }
//           }
//           if (_fieldName.length == 3) {
//             let arraylist = new Hashtable();
//             if (this.domainObj[_fieldName[0]]) {
//               let s = this.domainObj[_fieldName[0]];
//               this.domainObj[_fieldName[0]].forEach((value, index) => {
//                 let obj = {};
//                 if (value[_fieldName[1]]) {
//                   if (arraylist.containsKey(value[_fieldName[1]])) {
//                     obj[_fieldName[0]] = index + "." + _fieldName[1];
//                     duplicateFieldNames.push(obj);
//                   } else {
//                     if (_fieldName[2] == value[_fieldName[1]]) {
//                       arraylist.put(value[_fieldName[1]], index);
//                     }
//                   }
//                 }
//               });
//             }
//           }
//         });
//       }
//       let uniquefields = this.uniquevalueMetadata.uniquefields;

//       if (uniquefields) {
//         let arraylist = new Hashtable();
//         let field = uniquefields[0].split(this.splitString)[0];

//         if (this.domainObj[field]) {
//           this.domainObj[field].forEach((value, index) => {
//             // if(index > 0){
//             // let ss = this.domainObj[field];
//             // let length = this.domainObj[field].length;
//             let obj = {};
//             let key = "";
//             uniquefields.forEach((uniqueValue, uniqueIndex) => {
//               if (value[uniqueValue.split(this.splitString)[1]]) {
//                 key += value[uniqueValue.split(this.splitString)[1]];
//               } else {
//                 key += "";
//               }
//             });

//             if (key) {
//               if (arraylist.containsKey(key)) {
//                 obj[field] =
//                   index +
//                   "." +
//                   uniquefields[uniquefields.length - 1].split(
//                     this.splitString
//                   )[1];
//                 duplicateFieldNames.push(obj);
//               } else {
//                 arraylist.put(key, index);
//               }
//             }

//             // }
//           });
//         }
//       }

//       if (this.domainObj.uncompletedCount == -1) {
//         this.domainObj.uncompletedCount = 0;
//       }

//       this.domainObj.uncompletedCount += duplicateFieldNames.length;
//       console.warn("Duplicate Fields: " + JSON.stringify(duplicateFieldNames));
//     }
//     return duplicateFieldNames;
//   }

//   public validateCompleteness(index?, controlKeyParent?): Array<any> {
//     let missingMandatoryFieldNames = [];
//     let domainParent;

//     // 1. reset uncompleted count
//     // console.log(this.domainObj);
//     if (typeof this.domainObj == "undefined" || this.domainObj == "") {
//       //reset
//       this.domainObj = {
//         uncompletedCount: -1
//       };
//     } else {
//       this.domainObj.uncompletedCount = -1;
//     }
//     if (controlKeyParent) {
//       domainParent = this.form2DomainMap.get(controlKeyParent).objField; //addresses
//     }

//     // 3. validate static mandatory fields
//     let staticMandatoryFields = this.completenessMetadata.static;
//     if (staticMandatoryFields) {
//       staticMandatoryFields.forEach((fieldName: string) => {
//         let _fieldName = fieldName.split(this.splitString);
//         if (_fieldName.length == 1) {
//           // check field value
//           if (
//             !this.domainObj[_fieldName[0]] ||
//             (this.domainObj[_fieldName[0]] &&
//               this.domainObj[_fieldName[0]].length == 0)
//           ) {
//             //console.warn('Missing Static Mandatory Field=' + _fieldName[0]);
//             missingMandatoryFieldNames.push(_fieldName[0]);
//             this.domainObj.uncompletedCount =
//               this.domainObj.uncompletedCount == -1
//                 ? 1
//                 : this.domainObj.uncompletedCount + 1;
//           }
//         } else if (_fieldName.length >= 2) {
//           if (
//             typeof this.domainObj != "undefined" &&
//             typeof this.domainObj[_fieldName[0]] != "undefined"
//           ) {
//             this.cnt_max = 0;
//             this.cnt_min_not = 0;
//             this.domainObj[_fieldName[0]].forEach((value, index_1) => {
//               if (!value[_fieldName[1]]) {
//                 if (_fieldName[2] == "last") {
//                   this.cnt_max++;
//                 }
//                 //console.warn('Missing Static Mandatory Field=' + _fieldName[0] + '.' + index + '-' + _fieldName[1]);
//                 let obj = {};
//                 obj[_fieldName[0]] = index_1 + "." + _fieldName[1];
//                 missingMandatoryFieldNames.push(obj);
//                 this.domainObj.uncompletedCount =
//                   this.domainObj.uncompletedCount == -1
//                     ? 1
//                     : this.domainObj.uncompletedCount + 1;
//               }
//             });
//           }
//         }
//       });
//     }

//     for (let formFieldName in this.formConfig) {
//       let domainRecord = this.form2DomainMap.get(formFieldName);
//       if (domainRecord) {
//         let fieldName = domainRecord.objField;
//         let settingEntity = this.formConfig[formFieldName];
//         if (
//           staticMandatoryFields &&
//           staticMandatoryFields.some(x => {
//             return x.indexOf(fieldName) > -1;
//           })
//         ) {
//           //mandatory==true
//           if (!settingEntity["isOptionals"]) {
//             settingEntity["isOptionals"] = [];
//           }
//           if (index != null && index != undefined) {
//             settingEntity["isOptionals"][index] = false;
//           }
//         } else {
//           if (!settingEntity["isOptionals"]) {
//             settingEntity["isOptionals"] = [];
//           }
//           if (index != null && index != undefined) {
//             settingEntity["isOptionals"][index] = true;
//           }
//         }
//       }
//     }
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
//                     if (index != null && index != undefined) {
//                       indexParam = index_2;
//                     } else {
//                       indexParam = index_2;
//                     }
//                     let domainField;
//                     if (domainParent && domainParent == _fieldName[0]) {
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

//           if (isAnyConditionMatched) {
//             break; //||
//           }
//           //}
//         }
//         if (!isAnyConditionMatched) {
//           //for plain field
//           // mark conditional mandatory fields to optional ,as not match
//           if (this.formConfig && this.form2DomainMap && this.domain2FormMap) {
//             if (_fieldName.length == 1) {
//               let controlKey = this.domain2FormMap.get(fieldName);
//               if (controlKey) {
//                 let settingEntity = this.formConfig[controlKey];
//                 settingEntity["isOptional"] = true;
//               }
//             }
//             // } else if (_fieldName.length == 2) {
//             //     let controlKey = this.domain2FormMap.get(_fieldName[1]);//postalCode
//             //     if (controlKey) {
//             //         let settingEntity = this.formConfig[controlKey];
//             //         settingEntity["isOptionals"][index] = true;
//             //     }
//             // }
//           }
//         }
//       }
//     }

//     // 5. clear uncompleted count for completeness
//     if (this.domainObj.uncompletedCount == -1) {
//       this.domainObj.uncompletedCount = 0;
//     }

//     let count = 0;
//     for (let item in this.formConfig) {
//       if (
//         this.formConfig[item].onchange &&
//         typeof this.formConfig[item].onchange == "function"
//       ) {
//         let result = missingMandatoryFieldNames.find(
//           fieldName => fieldName == item
//         );
//         this.formConfig[item].onchange(() => {
//           if (
//             result == undefined &&
//             this.formConfig[item]["hasError"] === true
//           ) {
//             console.log(this.formConfig[item]);
//             count++;
//           }
//         });
//       }
//     }
//     this.domainObj.uncompletedCount = missingMandatoryFieldNames.length + count;
//     if (this.cnt_max > 0) {
//       this.domainObj.uncompletedCount =
//         this.domainObj.uncompletedCount == -1
//           ? 1
//           : this.domainObj.uncompletedCount - (this.cnt_max - 1);
//     }
//     // console.warn("Missing Mandatory Fields: " + missingMandatoryFieldNames.length);
//     // console.warn("Missing Mandatory Fields: " + JSON.stringify(missingMandatoryFieldNames));

//     return missingMandatoryFieldNames;
//   }

//   private executeCompletenessConditions(indexParam?, domainFieldParent?) {
//     //addresses
//     let executedConditions = {};
//     let originalConditions = this.completenessMetadata.conditions;
//     if (originalConditions) {
//       let arr = [];
//       for (let condName in originalConditions) {
//         let originalExpr = originalConditions[condName];
//         // let compiledExpr = originalExpr.replace(new RegExp(/{([^}]*)}/, "g"), 'this.domainObj.$1');
//         let compiledExpr = originalExpr.replace(
//           new RegExp(/{([^}]*)}/, "g"),
//           (match, token) => {
//             let tokens = token.split(".");
//             if (tokens.length == 1) {
//               return `this.domainObj.${tokens[0]}`;
//             } else {
//               if (tokens[0].indexOf("index") >= 0) {
//                 return `this.domainObj.${token}`;
//               } else {
//                 let value = this.domainObj[tokens[0]];
//                 return `this.formConfig.${
//                   tokens[0]
//                 }.options.find(function(item){return item.key=="${value}";}) && this.formConfig.${
//                   tokens[0]
//                 }.options.find(function(item){return item.key=="${value}";}).${
//                   tokens[1]
//                 }`;
//               }
//             }
//           }
//         );
//         let condValue = "";
//         // if (typeof this.domainObj != 'undefined') {
//         //     condValue = eval(compiledExpr);
//         // }
//         if (indexParam != undefined) {
//           let cnt = this.domainObj[domainFieldParent].length; //calculate array length
//           for (let index = 0; index < cnt; index++) {
//             //eval all the condition in array
//             if (
//               typeof this.domainObj != "undefined" &&
//               compiledExpr.indexOf("undefined") != 0
//             ) {
//               if (domainFieldParent) {
//                 if (
//                   domainFieldParent &&
//                   eval("this.domainObj." + domainFieldParent) != undefined
//                 ) {
//                   condValue = eval(compiledExpr);
//                 }
//               }
//             }
//             //console.warn('originalExpr=' + originalExpr);
//             //console.warn('compiledExpr=' + compiledExpr);
//             //console.warn('condValue=' + condValue);

//             if (executedConditions[condName] == undefined) {
//               let arr = [];
//               arr[index] = condValue;
//               executedConditions[condName] = arr;
//             } else {
//               executedConditions[condName][index] = condValue;
//             }
//           }
//         } else {
//           //plain
//           if (
//             typeof this.domainObj != "undefined" &&
//             compiledExpr.indexOf("undefined") != 0
//           ) {
//             condValue = eval(compiledExpr);
//           }
//           //console.warn('originalExpr=' + originalExpr);
//           //console.warn('compiledExpr=' + compiledExpr);
//           //console.warn('condValue=' + condValue);

//           executedConditions[condName] = condValue;
//         }
//       }
//     }
//     return executedConditions;
//   }
// }
