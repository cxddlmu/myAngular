import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";

@Component({
  selector: "app-validate-fields-submit-form",
  templateUrl: "./validate-fields-submit-form.component.html",
  styles: []
})
export class ValidateFieldsSubmitFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  add() {
    (this.form.get("phones") as FormArray).push(
      this.formBuilder.group({ tel: [null, Validators.required] })
    );
  }
  del(index) {
    (this.form.get("phones") as FormArray).removeAt(index);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null],
      email: [null, []],
      address: this.formBuilder.group({
        street: [null, Validators.required],
        street2: [null],
        zipCode: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        country: [null, Validators.required]
      }),
      phones: this.formBuilder.array(
        [this.formBuilder.group({ tel: [null, Validators.required] })],
        Validators.required
      )
    });
    this.initValueChange(this.form);
  }
  initValueChange(formGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      console.log(key);
      formGroup.get(key).valueChanges.forEach(val => {
        if (this.form.get(key) instanceof FormArray) {
          for (let item of (formGroup.get(key) as FormArray).controls) {
            this.initValueChange(item);
          }
        }
        console.log(key + val);
        if (key == "name") {
          formGroup.get("email").setValidators(Validators.required);
          formGroup
            .get("email")
            .updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }
      });
    });
  }
  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }
  isFieldInArrayValid(index: number, formArrayKey: string, field: string) {
    let fieldInArr = (this.form.get(formArrayKey) as FormArray)
      .at(index)
      .get(field);
    return !fieldInArr.valid && fieldInArr.touched;
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field)
    };
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      console.log("form submitted");
    } else {
      this.validateAllFormFields(this.form);
      console.log(this.form.get("email").errors);
      console.log(this.form.get("address.street").errors);
    }
    for (let item in this.form) {
      //todo
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        for (let formGroup of control.controls) {
          console.log(formGroup);
          this.validateAllFormFields(formGroup as FormGroup);
        }
      }
    });
  }

  reset() {
    this.form.reset();
  }
}
