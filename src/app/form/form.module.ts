import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { Routes, RouterModule } from '@angular/router';
import { SubmitFlagFormComponent } from './submit-flag-form/submit-flag-form.component';
import { ValidateFieldsSubmitFormComponent } from './validate-fields-submit-form/validate-fields-submit-form.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: FormComponent },

  {
    path:"",
    component: FormComponent,
    children:[
      { path: "simpleForm", component: SimpleFormComponent },
      { path: "validateSubmit", component: ValidateFieldsSubmitFormComponent },
      { path: "submitFlag", component: SubmitFlagFormComponent }
    ]
  }

];
@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [FormComponent, SubmitFlagFormComponent, SimpleFormComponent, ValidateFieldsSubmitFormComponent, FieldErrorDisplayComponent]
})

export class FormModule { }
