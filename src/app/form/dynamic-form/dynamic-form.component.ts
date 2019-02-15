import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [{
    key: 'email',
    type: 'input',
    templateOptions: {
      type: 'email',
      label: 'Email address',
      placeholder: 'Enter email',
      required: true,
    }
  },{
    key: 'Radio',
    type: 'radio',
    templateOptions: {
      label: 'Radio',
      placeholder: 'Placeholder',
      description: 'Description',
      required: true,
      options: [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
        { value: 3, label: 'Option 3' },
        { value: 4, label: 'Option 4' },
      ],
    },
  },
  {
    key: 'Datepicker',
    type: 'datepicker',
    templateOptions: {
      label: 'Datepicker',
      placeholder: 'Placeholder',
      description: 'Description',
      required: true,
    },
  }
];

  submit(model) {
    console.log(model);
  }
}
