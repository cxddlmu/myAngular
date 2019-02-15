import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { Routes, RouterModule } from '@angular/router';
import { SubmitFlagFormComponent } from './submit-flag-form/submit-flag-form.component';
import { ValidateFieldsSubmitFormComponent } from './validate-fields-submit-form/validate-fields-submit-form.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NestFormComponent } from './nest-form/nest-form.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';

import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker'
const routes: Routes = [
  // { path: "", component: FormComponent },

  {
    path: "",
    component: FormComponent,
    children: [
      { path: "simpleForm", component: SimpleFormComponent },
      { path: "validateSubmit", component: ValidateFieldsSubmitFormComponent },
      { path: "submitFlag", component: SubmitFlagFormComponent },
      { path: "nestForm", component: NestFormComponent },
      { path: "dynamic", component: DynamicFormComponent }
    ]
  }

];
@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    FormlyMatDatepickerModule
  ],
  exports: [RouterModule],
  declarations: [FormComponent, SubmitFlagFormComponent, NestFormComponent, DynamicFormComponent,SimpleFormComponent, ValidateFieldsSubmitFormComponent, FieldErrorDisplayComponent]
})

export class FormModule { }
