import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Required } from "src/app/shared/annotation/model-annotation";
import { Store } from "@ngrx/store";
import { ActionTypes, insertDemo, BasicInfo, Demographic } from "src/app/new-tech/ngrxStore/ngrxStore.component";

@Component({
  selector: "app-material2Form",
  templateUrl: "./material2Form.component.html"
  // styleUrls: ['./material2Form.component.css']
})
export class Material2FormComponent implements OnInit {
  constructor(private fb: FormBuilder, private store: Store<any>) { }

  ngOnInit() {
    this.basicInfo = this.fb.group({
      prefix: ["", Validators.required],
      firstName: [""],
      lastName: [""],
      customerTitle: [""],
      saluteBy: [""],
      aliasName: [""],
      otherName: [""],
      motherMaidenName: [""],
      birthday: [""],
      spokenLanguage: [""],
      correspondenceLanguage: [""],
      gender: [""],
      maritalStatus: [""]
    });
    this.nationalityForm = this.fb.group({
      'nationalityArray': this.fb.array([
        this.fb.group({
          'nationalityId': ['', Validators.required]
        })
      ], Validators.required),
    });
  }
  basicInfo;
  nationalityForm;
  demo: Demographic = {
    basicInfo: this.basicInfo
  }
  @Input() label: string;
  @Input() start: any;
  @Input() end: any;
  prefixList = [{ key: 1, value: "value1" }, { key: 2, value: "value2" }];
  nationalityList = [{}];
  nationList = [{ key: "cn", value: "china" }, { key: "vn", value: "vienan" }];

  onSubmit() {
    console.log(this.domain);
    console.log(this.basicInfo);
    this.store.dispatch(new insertDemo(this.demo));
    this.store.select(ActionTypes.SelectDemo).subscribe(val => { console.log(">>>>>>>" + JSON.stringify(val)); })
  }
  // @ViewChild("domain.prefix") prefix: viewchi;
  domain = { prefix: "" };
}
