//our root app component
import {Component, NgModule, OnInit } from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'nest-form',
  templateUrl: './nest-form.component.html',
})
export class NestFormComponent implements OnInit {
  
  private _form: FormGroup;
  title:string;
  
  constructor(
    private _fb: FormBuilder
    ) {
    this.title = 'Deep Nested Fields in Nested Array (Model Driven)! '
  }
  ngOnInit() {
    this._form = this._fb.group({
      'teacher': ['', Validators.required],
      'schools': this._fb.array([
          this._fb.group({
            'school_name': ['', Validators.required],
            'school_description': [''],
            'events': this._fb.array([
              this._fb.group({
                'event_name': ['']
              })
            ])
          })
      ])
    });
  }
  onSubmit() {
    console.log(this._form.value)
  }
  initSchool() {
    return this._fb.group({
        'school_name': ['', Validators.required],
        'school_description': [''],
        'events': this._fb.array([
          this._fb.group({
            'event_name': ['', Validators.required]
          })
        ])
    });
  }

  addSchool() {
    const control = <FormArray>this._form.controls['schools'];
    control.push(this.initSchool());
  }
  removeSchool(i: number) {
    const control = <FormArray>this._form.controls['schools'];
    control.removeAt(i);
  }

  initEvents() {
    return this._fb.group({
      'event_name': ['', Validators.required]
    });
  }

  addEvent(school,i: number) {
    const control = school.get('events') as FormArray;
    control.push(this.initEvents());
  }

  removeEvent(school,i: number) {
    const control = school.get('events') as FormArray;
    control.removeAt(i);
  }
}
