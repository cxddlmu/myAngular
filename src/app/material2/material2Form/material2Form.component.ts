import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Required } from "src/app/shared/annotation/model-annotation";

@Component({
  selector: "app-material2Form",
  templateUrl: "./material2Form.component.html"
  // styleUrls: ['./material2Form.component.css']
})
export class Material2FormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.personalInfoForm = this.fb.group({
      prefix: ["", Validators.required],
      firstName: [""],
      lastName: [""]
    });
  }
  personalInfoForm;
  @Input() label: string;
  @Input() start: any;
  @Input() end: any;
  prefixList = [{ key: 1, value: "value1" }, { key: 2, value: "value2" }];
  nationalityList = [{}];
  nationList = [{ key: "cn", value: "china" }, { key: "vn", value: "vienan" }];

  onSubmit() {
    console.log(this.domain);
    console.log(this.personalInfoForm);
  }
  // @ViewChild("domain.prefix") prefix: viewchi;
  domain = { prefix: "" };
}
