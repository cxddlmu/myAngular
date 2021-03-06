// import { FormGroup, FormArray, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
// import { Hashtable } from '../model/data-model'
// import * as _ from "lodash";

// import { DataValidator } from './data-validator'
// import { Subscription } from "rxjs/Subscription";
// import { Metadata } from 'app/customer-demographics/metadata/metadata';

// export class FormManagerExtend {

//     private form2DomainMap: Hashtable;
//     private domain2FormMap: Hashtable;

//     private dataValidator: DataValidator;

//     private missingMandatoryFieldNames: Array<string> = [];
//     private duplicateFieldNames: Array<string> = [];
//     private flagMap = new Map();
//     splitString: string = ".";
//     private arrayLengthMap = new Map();
//     subscriptionArray = [{}];
//     constructor(
//         private domainObj,
//         private formGroup: FormGroup,
//         private formConfig,
//         private metadata?: Metadata,
//         form2DomainMapping?,
//         private validityMetadata?,
//         private defaultValueMetadata?,
//         private completenessMetadata?,
//         private uniquevalueMetadata?,
//         private objChangeService?) {

//         this.form2DomainMap = new Hashtable();
//         this.domain2FormMap = new Hashtable();
//         // 1. setup internal hastables for mapping b/t form and domain

//         // console.warn("????" + "form2DomainMapping-beg");
//         this.initForm2DomainMapping(form2DomainMapping);
//         // console.warn("????" + "form2DomainMapping-end");

//         // 2. initialize form settings with validity metadata
//         this.initValidityFormConfig();
//         // console.warn("????" + "initValidityFormConfig-end");

//         // 3. pre populate form with domain data
//         this.prepopulateFormData();
//         // console.warn("????" + "prepopulateFormData-end");

//         // setTimeout(() => {
//         //     this.dataValidator = new DataValidator(
//         //         this.domainObj,
//         //         this.completenessMetadata,
//         //         this.uniquevalueMetadata,
//         //         this.formConfig,
//         //         this.form2DomainMap,
//         //         this.domain2FormMap
//         //     );

//         //     // 4. reset mandatory properties
//         //     // console.warn("????" + "resetMandatoryProperties-beg");
//         //     this.dataValidator.resetMandatoryProperties();
//         //     // console.warn("????" + "resetMandatoryProperties-end");
//         //     // 5. pre check completeness status   , domain 
//         //     this.missingMandatoryFieldNames = this.dataValidator.validateCompleteness();
//         //     // console.warn("????" + "validateCompleteness-end");
//         //     this.duplicateFieldNames = this.dataValidator.validateUniquevalue();
//         //     // 6. initialize form with value change handlers and set domain value
//         //     this.initFormGroup(this.formGroup, this.formConfig);
//         //     // console.warn("????" + "initFormGroup-end");
//         //     // //console.log("????"+this.customerSeqInput);
//         //     // 7. set default values
//         //     this.initDefaultValueSetting();
//         //     console.warn("????" + "initDefaultValueSetting-end");

//         //     //this.initArrayDefaultValue(formGroup, formConfig);

//         // }, 0);
//     }

//     public init() {
//         this.dataValidator = new DataValidator(
//             this.domainObj,
//             this.completenessMetadata,
//             this.uniquevalueMetadata,
//             this.formConfig,
//             this.form2DomainMap,
//             this.domain2FormMap
//         );

//         // 4. reset mandatory properties
//         // console.warn("????" + "resetMandatoryProperties-beg");
//         this.dataValidator.resetMandatoryProperties();
//         // console.warn("????" + "resetMandatoryProperties-end");
//         // 5. pre check completeness status   , domain 
//         this.missingMandatoryFieldNames = this.dataValidator.validateCompleteness();
//         // console.warn("????" + "validateCompleteness-end");
//         this.duplicateFieldNames = this.dataValidator.validateUniquevalue();
//         // 6. initialize form with value change handlers and set domain value
//         this.initFormGroup(this.formGroup, this.formConfig);
//         // console.warn("????" + "initFormGroup-end");
//         // //console.log("????"+this.customerSeqInput);
//         // 7. set default values
//         this.initDefaultValueSetting();
//         // console.warn("????" + "initDefaultValueSetting-end");

//         //this.initArrayDefaultValue(this.formGroup, this.formConfig);
//     }

//     // public refreshValidator(completenessMetadata){
//     //     this.dataValidator.refresh(completenessMetadata);
//     // }

//     // private initArrayDefaultValue(formGroup,formConfig) {
//     //     for (let controlKey in formGroup.controls) {
//     //         //let fieldMetadata = formConfig[controlKey];

//     //         if (controlKey && formGroup.controls[controlKey] instanceof FormArray) {
//     //             // handle onchange
//     //             (<Array<any>>formGroup.controls[controlKey].value).forEach((v,index) => {
//     //                 for (let key in v) {
//     //                     if (formConfig[key]['onchange']) {
//     //                         eval(formConfig[key]['onchange'])(formGroup, formConfig, key,index,this.completenessMetadata,Validators,this);
//     //                     }
//     //                 }
//     //             })

//     //         }
//     //     }
//     // }
//     public showMissingMandatoryFieldError() {
//         for (let controlKey in this.formConfig) {
//             let settingEntity = this.formConfig[controlKey];
//             settingEntity["hasError"] = false;
//             settingEntity["errorMsg"] = "";
//             if (settingEntity["hasErrors"]) {
//                 (<Array<any>>settingEntity["hasErrors"]).forEach((v, i, a) => {
//                     a[i] = false;
//                 })
//             }
//             if (settingEntity["errorMsgs"]) {
//                 (<Array<any>>settingEntity["errorMsgs"]).forEach((v, i, a) => {
//                     a[i] = '';
//                 })
//             }
//             if (typeof settingEntity.onchange == 'function') {
//                 settingEntity.onchange();
//             }
//             // settingEntity["errorMsgs"][0] = "";
//         }
//         ////console.log("======================showMissingMandatoryFieldError======================")
//         ////console.log(this.formGroup.get("phoneNumArray"));
//         this.missingMandatoryFieldNames.forEach(
//             (fieldName: any) => {
//                 ////console.log(fieldName);
//                 ////console.log(this.domain2FormMap);
//                 if (typeof fieldName == 'string') {
//                     let controlKey = this.domain2FormMap.get(fieldName);
//                     if (controlKey) {
//                         let settingEntity = this.formConfig[controlKey];
//                         let label = settingEntity["label"];
//                         settingEntity["hasError"] = true;
//                         if (label) {
//                             settingEntity["errorMsg"] = label + " is required";
//                         } else {
//                             settingEntity["errorMsg"] = "is required";
//                         }
//                     }
//                 } else if (typeof fieldName == 'object') {//index.domainField
//                     for (let prop in fieldName) {
//                         let _fieldName = fieldName[prop].split(this.splitString)
//                         ////console.log(_fieldName);
//                         let controlKey = this.domain2FormMap.get(_fieldName[1]);
//                         ////console.log(controlKey);
//                         if (controlKey) {
//                             //console.warn("======================show formConfig======================")
//                             ////console.log(this.formConfig);
//                             let settingEntity = this.formConfig[_fieldName[1]];
//                             let label = settingEntity["label"];
//                             //settingEntity["hasErrors"][_fieldName[0]] = true;
//                             // (<Array<any>>settingEntity["hasErrors"]).forEach((v, i, a) => {
//                             //     if (i == _fieldName[0]) {
//                             //         a[i] = true;
//                             //     }
//                             // })
//                             if (settingEntity["hasErrors"]) {
//                                 settingEntity["hasErrors"][_fieldName[0]] = true;
//                             } else {
//                                 settingEntity["hasErrors"] = [];
//                                 settingEntity["hasErrors"][_fieldName[0]] = true;
//                             }
//                             if (settingEntity["errorMsgs"]) {
//                                 if (label) {
//                                     settingEntity["errorMsgs"][_fieldName[0]] = label + " is required";
//                                 } else {
//                                     settingEntity["errorMsgs"][_fieldName[0]] = "is required";
//                                 }
//                             } else {
//                                 settingEntity["errorMsgs"] = [];
//                                 if (label) {
//                                     settingEntity["errorMsgs"][_fieldName[0]] = label + " is required";
//                                 } else {
//                                     settingEntity["errorMsgs"][_fieldName[0]] = "is required";
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         );

//         this.duplicateFieldNames.forEach(
//             (fieldName: any) => {
//                 ////console.log(fieldName);
//                 ////console.log(this.domain2FormMap);
//                 if (typeof fieldName == 'object') {//index.domainField
//                     for (let prop in fieldName) {
//                         let _fieldName = fieldName[prop].split(this.splitString)
//                         ////console.log(_fieldName);
//                         let controlKey = this.domain2FormMap.get(_fieldName[1]);
//                         ////console.log(controlKey);
//                         if (controlKey) {
//                             //console.warn("======================show formConfig======================")
//                             let settingEntity = this.formConfig[_fieldName[1]];
//                             let label = settingEntity["label"];

//                             if (settingEntity["hasErrors"]) {
//                                 settingEntity["hasErrors"][_fieldName[0]] = true;
//                             } else {
//                                 settingEntity["hasErrors"] = [];
//                                 settingEntity["hasErrors"][_fieldName[0]] = true;
//                             }
//                             if (settingEntity["errorMsgs"]) {
//                                 if (label) {
//                                     settingEntity["errorMsgs"][_fieldName[0]] = label + " can not duplicate";
//                                 } else {
//                                     settingEntity["errorMsgs"][_fieldName[0]] = "can not duplicate";
//                                 }
//                             } else {
//                                 settingEntity["errorMsgs"] = [];
//                                 if (label) {
//                                     settingEntity["errorMsgs"][_fieldName[0]] = label + " can not duplicate";
//                                 } else {
//                                     settingEntity["errorMsgs"][_fieldName[0]] = "can not duplicate";
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         );
//         //console.log(this.duplicateFieldNames);
//     }
//     //step 1
//     private initForm2DomainMapping(form2DomainMapping) {

//         for (let controlKey in form2DomainMapping) {
//             ////console.log(controlKey);
//             let domainRecord = form2DomainMapping[controlKey];
//             if (domainRecord) {
//                 this.form2DomainMap.put(controlKey, domainRecord);
//                 if (typeof domainRecord.objField == 'string' && typeof domainRecord.children == 'undefined') {
//                     this.domain2FormMap.put(domainRecord.objField, controlKey);
//                 } else if (typeof domainRecord.objField == 'string' && typeof domainRecord.children !== 'undefined') {
//                     ////console.log("=================initForm2DomainMapping domainRecord=================");
//                     ////console.log(domainRecord.children);
//                     // let columns = [];
//                     // for (let prop in domainRecord.objField) {
//                     //     ////console.log(prop)
//                     //     ////console.log(domainRecord.objField[prop].objField)
//                     //     columns.push(domainRecord.objField[prop].objField);
//                     //     this.domain2FormMap.put(prop, domainRecord.objField[prop].objField);
//                     // }
//                     // this.domain2FormMap.put(controlKey, columns);
//                     this.domain2FormMap.put(domainRecord.objField, controlKey);
//                     this.initForm2DomainMapping(domainRecord.children);
//                 } else {
//                     for (let prop in domainRecord.objField) {
//                         this.domain2FormMap.put(domainRecord.objField[prop], controlKey);
//                     }
//                 }
//             }
//         }

//         ////console.log(this.domain2FormMap);
//     }

//     private initValidityFormConfig() {


//         // for (let controlKey of this.formGroup.value) {
//         //     this.formConfig[controlKey] = this.metadata[controlKey];
//         // }

//         for (let domainField in this.validityMetadata) {
//             let controlKey = this.domain2FormMap.get(domainField);
//             if (controlKey) {
//                 let settingEntity = this.formConfig[controlKey];
//                 let validityRecord = this.validityMetadata[domainField];
//                 for (let validityKey in validityRecord) {
//                     settingEntity[validityKey] = validityRecord[validityKey];
//                 }
//             }
//         }
//     }

//     private prepopulateFormData() {
//         for (let controlKey in this.formGroup.value) {
//             this.iterate(this.domainObj[controlKey], this.formGroup.get(controlKey));
//         }

//     }
//     //formgroup--personal--{firstname:0}--firstname
//     //formgroup--nationalarr--{nationalid:0}--nationalid
//     iterate(domainVal, control: AbstractControl) {
//         if (_.isPlainObject(domainVal)) {
//             if (_.isEmpty(domainVal)) {
//                 return;
//             }
//             for (let key in control.value) {
//                 this.iterate(domainVal[key], control.get(key));
//             }
//         } else if (_.isArray(domainVal)) {
//             if (domainVal.length == 0) {
//                 return;
//             }
//             let index = 0;
//             for (let item of domainVal) {
//                 let controlArr = <FormArray>control;
//                 if (index > 0) {
//                     controlArr.push(new FormGroup(controlArr.at(0).value))
//                 }
//                 this.iterate(item, controlArr.at(index));
//                 index++;
//             }
//         } else {
//             control.patchValue(domainVal);
//         }
//     }


//     setDefaultVal(metadata, control: AbstractControl) {
//         if (control instanceof FormGroup) {
//             if (_.isEmpty(metadata)) {
//                 return;
//             }
//             for (let key in control.value) {
//                 this.setDefaultVal(metadata[key], control.get(key));
//             }
//         } else if (control instanceof FormArray) {
//             if (metadata.length == 0) {
//                 return;
//             }
//             let index = 0;
//             for (let item of metadata) {
//                 let controlArr = <FormArray>control;
//                 this.setDefaultVal(item, controlArr.at(index));
//                 index++;
//             }
//         } else {
//             if (!control.value) {
//                 control.patchValue(metadata);
//             }
//         }
//     }

//     private setDefaultValueMetadataControl(staticDefaultValueFields: any, control: any, index?: number) {
//         // let controlKey = this.domain2FormMap.get(fieldName);
//         //console.warn('static default value aaaaaaaaaaaaa' + JSON.stringify(controlKey));
//         //if (controlKey) {
//         // let control: any = formGroup.get(controlKey);
//         //console.warn('static default value bbbbbbbbbbbbb' + control);
//         // console.warn("setDefaultValueMetadataControl" + control);
//         //console.warn(!control.value);
//         if (control instanceof FormControl) {
//             if (!control.value) {
//                 //console.warn('static default value ccccccccccccc' + staticDefaultValueFields);
//                 let compiledValue = staticDefaultValueFields.replace(new RegExp(/{([^}]*)}/, "g"), (match, token) => {
//                     return this.domainObj[token];
//                 });
//                 //console.warn('static default value ddddddddddddd' + compiledValue);
//                 control.patchValue(compiledValue, { onlySelf: true });
//             }
//         } else if (control instanceof FormArray) {
//             //console.warn('static default value ccccccccccccc' + JSON.stringify(staticDefaultValueFields));
//             ////console.log(staticDefaultValueFields);
//             let compiledValue = [];
//             control.controls.forEach((v, i) => {
//                 if (index === undefined || index === null || i == index) {
//                     for (let prop in staticDefaultValueFields) {
//                         if (!v.get(prop).value) {
//                             let compiledValue = staticDefaultValueFields[prop].replace(new RegExp(/{([^}]*)}/, "g"), (match, token) => {
//                                 return this.domainObj[token];
//                             });
//                             v.get(prop).patchValue(compiledValue, { onlySelf: true });
//                             //console.warn('static default value ddddddddddddd' + compiledValue);
//                         } else {
//                             //if value of 'v.get(prop).value' already exists, in order to trigger the valuechange, change the value to empty and then change it back
//                             //need to trigger the valuechange, as set the value to the domainObj, or can not pass the mandatory validate
//                             let tmp = v.get(prop).value;
//                             v.get(prop).patchValue('', { onlySelf: true });
//                             v.get(prop).patchValue(tmp, { onlySelf: true });
//                         }
//                     }
//                     //compiledValue[i] = v;
//                     control.get(String(i)).patchValue(v, { onlySelf: true });
//                 }
//             })
//             ////console.log(compiledValue);

//             //     control.setValue(compiledValue);
//         }
//     }
//     /**
//         * this.mainFormGroup = this.formBuilder.group({
//                personal: this.basicInformationComponent.formGroup
//                , identificationForm: ''
//                , contactDetailsForm: ''
//                , addressDetailsForm: ''
//                , nationalityForm: ''
//                , statementsForm: ''
//                , taxInformationForm: ''
//                , employmentForm: ''
//                , kycForm: ''
//                , associationsForm: ''
//                , bankForm: ''
//            });
//            this.mainConfig = {
//                personal: this.basicInformationComponent.config
//            }
//            this.metaData = {
//                personal: this.basicInformationComponent.custMetadata
//            }
//         *//**
// * 
// */



//     private initDefaultValueSetting() {

//         //cs
//         let metadata = this.metadata.getDefaultValueMetadata();
//         for (let controlKey in this.formGroup.value) {
//             this.iterate(metadata[controlKey], this.formGroup.get(controlKey));
//         }
//         //ce

//         // this.metadata.getDefaultValueMetadata()
//         let staticDefaultValueFields = this.defaultValueMetadata.static;
//         for (let fieldName in staticDefaultValueFields) {
//             ////console.log(fieldName);
//             ////console.log(staticDefaultValueFields[fieldName]);
//             ////console.log(this.domain2FormMap);
//             this.setDefaultValueMetadataControl(staticDefaultValueFields[fieldName], this.formGroup.get(fieldName));
//         }

//         // 2. handle conditional default values

//         for (let controlKey in this.formGroup.controls) {
//             if (this.formGroup.controls[controlKey] instanceof FormArray) {
//                 (<FormArray>this.formGroup.get(controlKey)).controls.forEach((v, i, a) => {
//                     for (let controlKey_2 in v.value) {
//                         this.handleConditionalDefaultValueSetting(controlKey_2, i, controlKey);
//                     }
//                 })
//             } else {
//                 this.handleConditionalDefaultValueSetting(controlKey);
//             }
//         }

//     }

//     private handleConditionalDefaultValueSetting(currentTriggerControlKey?: string, index?, currentTriggerControlKeyParent?, fromValueChange?) {
//         let domainParent
//         if (currentTriggerControlKeyParent) {
//             domainParent = this.form2DomainMap.get(currentTriggerControlKeyParent).objField;
//         }
//         // 1. execute condition expressions
//         let executedConditions = this.executeDefaultValueConditions(index, domainParent);//{country_province:[boolean]}
//         // 2. handle conditional default values
//         let 14f3w7rhWxJBLEBgQPstLE5PSb3GTQecED = this.defaultValueMetadata.conditional;
//         if (14f3w7rhWxJBLEBgQPstLE5PSb3GTQecED) {
//             for (let triggerFieldName in conditionalDefaultValueFields) {
//                 let triggerField = conditionalDefaultValueFields[triggerFieldName];//triggerField-{},triggerFieldName-addresses.country
//                 let arr = triggerFieldName.split('.');
//                 //console.warn('conditional default value 11111' + triggerField);
//                 if (triggerFieldName == currentTriggerControlKey || arr[1] == currentTriggerControlKey || arr[0] == currentTriggerControlKey) {
//                     for (let fieldName in triggerField) {//field-{},fieldName-addresses.postalCode
//                         let field = triggerField[fieldName];
//                         //console.warn('conditional default value 2222' + fieldName);
//                         let defaultValue;
//                         if (Array.isArray(field['value'])) {
//                             defaultValue = field['value'];
//                         } else {
//                             defaultValue = field['value'] && field['value'].split(',') || [''];
//                         }
//                         let requiredCondition = field['condition'] && field['condition'].split(',') || [];
//                         let isOverride = field['isOverride'];
//                         let isDisabled = field['isDisabled'];
//                         let maxLength = field['maxLength'];
//                         let partialMask = field['isPartialMask'];
//                         //console.warn('conditional default value aaaaaaaaaaaaa' + defaultValue);
//                         //console.warn('conditional default value bbbbbbbbbbbbb' + requiredCondition);
//                         //console.warn('conditional default value ccccccccccccc' + executedConditions[requiredCondition]);

//                         if (field['isOtherValue'] && field['isOtherValue'].length == 2) {
//                             const optionValue = this.validityMetadata[triggerFieldName].options.find(item => item.key == this.domainObj[triggerFieldName]);
//                             const otherValue = optionValue && optionValue.other || '';
//                             const [from, to] = field['isOtherValue'];
//                             const end = to == -1 ? otherValue.length - 1 : to;
//                             let value = end == from ? (otherValue[from] || '') : otherValue.slice(from, end + 1);
//                             if (isOverride && fromValueChange || (!isOverride && this.domainObj[fieldName] == "")) {
//                                 this.formGroup.get(this.domain2FormMap.get(fieldName)).patchValue(value.trim(), { onlySelf: true });
//                             }
//                         }

//                         requiredCondition.forEach((reqCond, i) => {//reqCond-country_postalCode
//                             if (index != undefined) {
//                                 let arr = fieldName.split('.');
//                                 let domainArr = arr[0];
//                                 let domainField = arr[1];
//                                 if (executedConditions[reqCond] && executedConditions[reqCond][index] == true) {
//                                     if (typeof triggerField[fieldName]["section"] == 'undefined') {
//                                         let controlKey = this.domain2FormMap.get(domainArr);
//                                         if (controlKey) {//controlKey-addressDetailArray
//                                             let control: any = this.formGroup.get(controlKey).get(String(index)).get(domainField);
//                                             ////console.log(control);
//                                             //console.warn('conditional default value ddddddddddddd' + control || control.value);
//                                             if (defaultValue != undefined) {
//                                                 this.patchValue(defaultValue, isOverride, fromValueChange, control, i, Array.isArray(field['value']));
//                                             }
//                                             if (isDisabled != undefined) {
//                                                 let settingEntity = this.formConfig[domainField];
//                                                 if (settingEntity['isDisableds']) {
//                                                     settingEntity['isDisableds'][index] = isDisabled;
//                                                 } else {
//                                                     settingEntity['isDisableds'] = [];
//                                                     settingEntity['isDisableds'][index] = isDisabled;
//                                                 }
//                                             }
//                                             if (maxLength != undefined) {
//                                                 let settingEntity = this.formConfig[domainField];
//                                                 if (settingEntity['maxLengths']) {
//                                                     settingEntity['maxLengths'][index] = maxLength;
//                                                 } else {
//                                                     settingEntity['maxLengths'] = [];
//                                                     settingEntity['maxLengths'][index] = maxLength;
//                                                 }
//                                             }
//                                             if (partialMask != undefined) {
//                                                 let settingEntity = this.formConfig[domainField];
//                                                 if (settingEntity['isPartialMask']) {
//                                                     settingEntity['isPartialMask'][index] = partialMask;
//                                                 } else {
//                                                     settingEntity['isPartialMask'] = [];
//                                                     settingEntity['isPartialMask'][index] = partialMask;
//                                                 }
//                                             }
//                                         }
//                                     } else if (typeof triggerField[fieldName]["section"] != 'undefined' && typeof domainField == 'undefined') {
//                                         this.setSectionDefaultValue(triggerField, fieldName, defaultValue[i], isDisabled, domainArr, isOverride);
//                                     }
//                                 }
//                             } else {
//                                 if (executedConditions[reqCond] == true) {
//                                     let arr = fieldName.split('.');
//                                     let domainArr = arr[0];
//                                     if (typeof triggerField[fieldName]["section"] == 'undefined') {
//                                         let controlKey = this.domain2FormMap.get(domainArr);
//                                         if (controlKey) {
//                                             let control: any = this.formGroup.get(controlKey);
//                                             ////console.log(control);
//                                             if (isDisabled != undefined) {
//                                                 let settingEntity = this.formConfig[domainArr];
//                                                 settingEntity['isDisabled'] = isDisabled;
//                                             }
//                                             if (maxLength != undefined) {
//                                                 let settingEntity = this.formConfig[domainArr];
//                                                 settingEntity['maxLength'] = maxLength;
//                                             }
//                                             if (partialMask != undefined) {
//                                                 let settingEntity = this.formConfig[domainArr];
//                                                 settingEntity['isPartialMask'] = partialMask;
//                                             }
//                                             if (defaultValue != undefined) {
//                                                 this.patchValue(defaultValue, isOverride, fromValueChange, control, i, Array.isArray(field['value']));
//                                             }
//                                             //console.warn('conditional default value ddddddddddddd' + control || control.value);
//                                         }
//                                     }
//                                     else if (typeof triggerField[fieldName]["section"] != 'undefined') {
//                                         this.setSectionDefaultValue(triggerField, fieldName, defaultValue[i], isDisabled, domainArr, isOverride);
//                                     }
//                                 }
//                             }

//                         });

//                     }
//                     if (currentTriggerControlKey) {
//                         break;
//                     }
//                 }
//             }
//         }
//     }

//     private setSectionDefaultValue(triggerField, fieldName, defaultValue, isDisabled, domainArr, isOverride) {
//         if (this.objChangeService.getObjs().length > 0) {
//             this.objChangeService.getObjs().some(v => {
//                 //console.log(v);
//                 if (v.section == triggerField[fieldName]["section"] && (v.formGroup.get(domainArr).value == '' || isOverride)) {
//                     //console.log(v.formGroup);
//                     // changedFormGroup = v.formGroup ;
//                     let compiledValue = defaultValue.replace(new RegExp(/{([^}]*)}/, "g"), (match, token) => {
//                         //console.log(match);
//                         //console.log(token)
//                         return v.domainObj[token];
//                     });
//                     if (isDisabled != undefined) {
//                         let settingEntity = v.formConfig[domainArr];
//                         settingEntity['isDisabled'] = isDisabled;
//                     }
//                     if (compiledValue != undefined) {
//                         v.domainObj[domainArr] = compiledValue;
//                         v.formGroup.get(domainArr).patchValue(compiledValue, { onlySelf: true });
//                     }
//                     return v;
//                 }
//             });
//             //console.log(this.objChangeService.getObjs());
//         }
//     }

//     private patchValue(defaultValue, isOverride, fromValueChange, control, i, isConfigInArray) {
//         if (!isConfigInArray && Array.isArray(defaultValue)) {
//             if (control != null && (isOverride && fromValueChange || !control.value)) {
//                 let compiledValue = defaultValue[i].replace(new RegExp(/{([^}]*)}/, "g"), (match, token) => {
//                     return this.domainObj[token];
//                 });
//                 control.patchValue(compiledValue, { onlySelf: true });
//             }
//         } else if (Array.isArray(defaultValue) && isConfigInArray) {
//             if (defaultValue.length == 0) {
//                 control.patchValue(defaultValue, { onlySelf: true });
//             } else {
//                 if (control != null && (isOverride && fromValueChange || !control.value)) {
//                     let compiledValue = defaultValue[i].replace(new RegExp(/{([^}]*)}/, "g"), (match, token) => {
//                         return this.domainObj[token];
//                     });
//                     let arr = [];
//                     arr.push(compiledValue);
//                     control.patchValue(arr, { onlySelf: true });
//                 }
//             }
//         }
//     }

//     private executeDefaultValueConditions(index?, domainField?) {
//         let executedConditions = {};
//         let originalConditions = this.defaultValueMetadata.conditions;
//         if (originalConditions) {
//             for (let condName in originalConditions) {
//                 let originalExpr = originalConditions[condName];
//                 let compiledExpr = originalExpr.replace(new RegExp(/{([^}]*)}/, "g"), 'this.domainObj.$1');

//                 let condValue = '';
//                 if (typeof this.domainObj != 'undefined' && compiledExpr.indexOf('undefined') != 0) {
//                     if (domainField) {
//                         let param = domainField;
//                         if (param && eval('this.domainObj.' + param) != undefined) {
//                             return  eval(compiledExpr);
//                         }
//                     }
//                 }
//                 //console.warn('originalExpr=' + originalExpr);
//                 //console.warn('compiledExpr=' + compiledExpr);
//                 //console.warn('condValue=' + condValue);
//                 //executedConditions[condName] = condValue;
//                 if (index != undefined) {//array
//                     if (executedConditions[condName] == undefined) {
//                         let arr = [];
//                         arr[index] = condValue;
//                         executedConditions[condName] = arr;
//                     } else {
//                         executedConditions[condName][index] = condValue;
//                     }
//                 } else {
//                     let condValue = '';
//                     if (typeof this.domainObj != 'undefined' && compiledExpr.indexOf('undefined') != 0) {
//                         if (compiledExpr.indexOf('[index]') < 0) {
//                             condValue = eval(compiledExpr);
//                         }
//                     }
//                     executedConditions[condName] = condValue;
//                 }
//             }
//         }

//         return executedConditions;
//     }

//     private subscribeValueChangeInArray(controlKey, group, formConfig, controlValue?) {
//         let control = group.get(controlKey);

//         if (group.get(controlKey) instanceof FormArray) {
//             /**
//                         * unsubscribe
//                         */
//             if (this.subscriptionArray && this.subscriptionArray.length >= 1) {
//                 this.subscriptionArray.forEach(v => {
//                     for (let controlKey in v) {
//                         v[controlKey].unsubscribe();
//                     }
//                 })
//                 this.subscriptionArray = [];
//             }
//             //     this.flagMap.set(controlKey, (<FormArray>group.get(controlKey)).controls.length);
//             // } else {
//             //     if (controlValue && controlValue.length < this.flagMap.get(controlKey)) {
//             //         this.flagMap.set(controlKey, controlValue.length);
//             //     } else {
//             //         this.flagMap.set(controlKey, this.flagMap.get(controlKey) + 1);
//             //     }
//             // }
//             //let len = (<FormArray>group.get(controlKey)).controls.length;
//             (<FormArray>group.get(controlKey)).controls.forEach((formGroup_1, index, a) => {
//                 // if (index == len - 1) {//subscirbe the newest array
//                 this.subscriptionArray[index] = {}
//                 for (let controlKey_1 in (<FormGroup>formGroup_1).controls) {
//                     this.subscriptionArray[index][controlKey_1] = formGroup_1.get(controlKey_1).valueChanges.subscribe(controlValue_1 => {
//                         //console.warn('############' + index + controlKey_1 + controlValue_1);

//                         /**
//                                                 * just array call 
//                                                 */

//                         if (this.form2DomainMap.containsKey(controlKey)) {
//                             ////console.log("=========================== populate value from form into domain object===========================")
//                             let domainRecord = this.form2DomainMap.get(controlKey);
//                             ////console.log(controlKey)   
//                             ////console.log(domainRecord)
//                             //this.populateDomainValue(domainRecord, controlValue_1);
//                             //group.get(controlKey).get(String(index)).get(controlKey_1).setValue(controlValue_1, { onlySelf: true });
//                             /**
//                                                         * populateDomainValue 
//                                                         */
//                             this.populateDomainValue(domainRecord, controlValue_1, index, controlKey_1);

//                         }
//                         this.handleConditionalDefaultValueSetting(controlKey_1, index, controlKey, true);
//                         this.missingMandatoryFieldNames = this.dataValidator.validateCompleteness(index, controlKey);
//                         let fieldMetadata = formConfig[controlKey_1];
//                         if (fieldMetadata) {
//                             // handle onchange
//                             if (fieldMetadata["onchange"]) {
//                                 eval(fieldMetadata["onchange"])(null, index, controlKey_1);
//                             }
//                         }
//                     });

//                 }
//                 // setTimeout(() => {
//                 //             console.warn("setTimeout"+control);

//                 //     this.setDefaultValueMetadataControl(this.defaultValueMetadata.static[this.form2DomainMap.get(controlKey).objField], this.formGroup.get(controlKey), index);
//                 // }, 0)
//                 // }
//             })
//         }
//     }

//     //6.
//     private initFormGroup(group: FormGroup, formConfig?) {
//         ////console.log("=============================initFormGroup=============================")
//         for (let controlKey in group.controls) {
//             /**
//                         * init formarray
//                         */
//             this.subscribeValueChangeInArray(controlKey, group, formConfig);
//             ////console.log(controlKey)
//             ////console.log(control)
//             // if (control instanceof FormGroup) { // don't support nested form group for the time being
//             //     throw new Error(`"FormManager doesn't support nested form group (${controlKey}).`);
//             // } else if (control instanceof FormArray) {
//             //     //console.warn(control)
//             // } else {
//             // register valueChanges

//             //add item in the array and update item in the array will trigger the change
//             group.get(controlKey).valueChanges.forEach(
//                 (controlValue: any) => {
//                     // console.warn('++++++++++++++++++++' + controlKey + JSON.stringify(controlValue));
//                     //console.warn(`control value changed: (${controlKey}) = (${JSON.stringify(controlValue)})`);

//                     // populate value from form into domain object
//                     if (this.form2DomainMap.containsKey(controlKey)) {
//                         ////console.log("=========================== populate value from form into domain object===========================")
//                         let domainRecord = this.form2DomainMap.get(controlKey);
//                         ////console.log(controlKey)   
//                         ////console.log(domainRecord)
//                         this.populateDomainValue(domainRecord, controlValue);//when add item in the array, add new subscrition of valueChanges
//                     }
//                     if (Array.isArray(controlValue)) {
//                         let length;
//                         if (controlValue.length == 0) {
//                             length = 0;
//                         } else {
//                             length = controlValue.length - 1;
//                         }
//                         /**
//                                                 * subscirbe valueChange for the new item in the array
//                                                 */
//                         this.subscribeValueChangeInArray(controlKey, group, formConfig, controlValue);
//                         //if (this.arrayLengthMap.has(controlKey)) {
//                         if (!this.arrayLengthMap.has(controlKey) || this.arrayLengthMap.get(controlKey) != length) {//addressdetailarray -- add item in the array
//                             let staticDefaultValueFields = this.defaultValueMetadata.static;
//                             for (let fieldName in staticDefaultValueFields) {
//                                 // //console.log("=========================== value change defaultValueMetadata.static===========================")
//                                 // //console.log(fieldName);
//                                 // //console.log(staticDefaultValueFields[fieldName]);
//                                 // //console.log(this.domain2FormMap);
//                                 if (this.domain2FormMap.get(fieldName) == controlKey) {
//                                     this.setDefaultValueMetadataControl(staticDefaultValueFields[fieldName], this.formGroup.get(this.domain2FormMap.get(fieldName)), length);
//                                 }
//                             }
//                             this.arrayLengthMap.set(controlKey, length);

//                             //  handle conditional default values
//                             if (this.form2DomainMap.containsKey(controlKey)) {
//                                 let domainRecord = this.form2DomainMap.get(controlKey);
//                                 let triggerFieldName = domainRecord.objField;
//                                 this.handleConditionalDefaultValueSetting(triggerFieldName, length, controlKey, true);//add one item in array
//                             }
//                             //this.missingMandatoryFieldNames = this.dataValidator.validateCompleteness(length, controlKey);
//                         }
//                         // } else {
//                         //     let staticDefaultValueFields = this.defaultValueMetadata.static;
//                         //     for (let fieldName in staticDefaultValueFields) {
//                         //         ////console.log(fieldName);
//                         //         ////console.log(staticDefaultValueFields[fieldName]);
//                         //         ////console.log(this.domain2FormMap);
//                         //         this.setDefaultValueMetadataControl(staticDefaultValueFields[fieldName], this.formGroup.get(this.domain2FormMap.get(fieldName)));
//                         //     }
//                         //     this.arrayLengthMap.set(controlKey, controlValue.length - 1);
//                         //     length = controlValue.length - 1;
//                         //     //  handle conditional default values
//                         //     if (this.form2DomainMap.containsKey(controlKey)) {
//                         //         let domainRecord = this.form2DomainMap.get(controlKey);
//                         //         let triggerFieldName = domainRecord.objField;
//                         //         this.handleConditionalDefaultValueSetting(triggerFieldName, length, controlKey);
//                         //     }
//                         //     this.missingMandatoryFieldNames = this.dataValidator.validateCompleteness(length, controlKey);

//                         // }

//                     } else {
//                         //  handle conditional default values
//                         if (this.form2DomainMap.containsKey(controlKey)) {
//                             let domainRecord = this.form2DomainMap.get(controlKey);
//                             let triggerFieldName = domainRecord.objField;
//                             this.handleConditionalDefaultValueSetting(triggerFieldName, undefined, undefined, true);//
//                         }
//                     }
//                     this.missingMandatoryFieldNames = this.dataValidator.validateCompleteness(length, controlKey);
//                     this.duplicateFieldNames = this.dataValidator.validateUniquevalue();
//                     // this.dataValidator.validateUniquevalue();
//                     // this.initArrayDefaultValue(group,formConfig);
//                     let fieldMetadata = formConfig[controlKey];
//                     if (fieldMetadata) {
//                         // handle onchange
//                         if (fieldMetadata["onchange"]) {
//                             //fieldMetadata["onchange"]();
//                             eval(fieldMetadata['onchange'])(null, controlKey);
//                         }
//                     }


//                 });
//             // }
//         }
//         ////console.log(group)
//     }

//     private deriveControlValue(key, domainRecord) {
//         ////console.log(key)
//         ////console.log(domainRecord)
//         ////console.log(this.domainObj)
//         let controlValue;
//         if (this.domainObj && this.domainObj.length !== 0) {
//             if (typeof domainRecord.objField == 'string') {
//                 controlValue = this.domainObj[domainRecord.objField];
//             }
//             else if (typeof domainRecord.objField == 'object') {
//                 controlValue = {};
//                 this.domainObj[key].forEach((x, i) => {
//                     let value = {};
//                     for (let prop in domainRecord.objField) {
//                         value[prop] = x[domainRecord.objField[prop].objField];
//                     }
//                     controlValue[i] = value;
//                 });
//             }
//             else {
//                 controlValue = {};
//                 for (let prop in domainRecord.objField) {
//                     // ////console.log("=====================object=====================")
//                     ////console.log(prop)
//                     // controlValue[prop] = this.domainObj[domainRecord.objField[prop]];
//                     controlValue[prop] = this.domainObj.objField[prop].objField;
//                     ////console.log(controlValue[prop])
//                 }
//             }
//         }
//         ////console.log(controlValue)
//         return controlValue;
//     }
//     //
//     private populateDomainValue(domainRecord, controlValue, index?, controlKey?) {
//         //console.warn("=====================populateDomainValue=====================")
//         ////console.log(domainRecord)
//         ////console.log(controlValue)
//         if (index == undefined) {
//             if (this.domainObj && this.domainObj.length !== 0) {
//                 if (typeof domainRecord.objField == 'string') {
//                     this.domainObj[domainRecord.objField] = controlValue;
//                 } else {
//                     if (typeof controlValue == 'string') {
//                         controlValue = JSON.parse(controlValue);
//                     }
//                     for (let prop in domainRecord.objField) {
//                         this.domainObj[domainRecord.objField[prop]] = controlValue[prop];
//                     }
//                 }
//             }

//         } else {
//             if (this.domainObj[domainRecord.objField] && this.domainObj[domainRecord.objField][index]) {
//                 this.domainObj[domainRecord.objField][index][controlKey] = controlValue;
//             } else {
//                 if (!Array.isArray(this.domainObj[domainRecord.objField])) {
//                     this.domainObj[domainRecord.objField] = [];
//                 }
//                 let obj = {};
//                 obj[controlKey] = controlValue;
//                 this.domainObj[domainRecord.objField].push(obj);
//             }
//         }


//         ////console.log(this.domainObj)
//     }
// }