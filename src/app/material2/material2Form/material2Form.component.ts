import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Required } from "src/app/shared/annotation/model-annotation";
import { Store } from "@ngrx/store";
import { ActionTypes, insertDemo, BasicInfo, Demographic, selectBasicInfo, selectAll, selectEntities } from "src/app/new-tech/ngrxStore/ngrxStore.component";

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

  @Input() label: string;
  @Input() start: any;
  @Input() end: any;
  prefixList = [{ key: 1, value: "value1" }, { key: 2, value: "value2" }];
  nationalityList = [{}];
  nationList = [{ key: "cn", value: "china" }, { key: "vn", value: "vienan" }];

  onSubmit() {
    // console.log(this.domain);
    let demo: Demographic = {
      basicInfo: this.basicInfo.value,
      nationality: this.nationalityForm.value,
      id: '0'
    }
    console.log(demo);
    this.store.dispatch(new insertDemo(demo));
    this.store.select(selectAll).subscribe(val => { console.log(">>>>>>>" + JSON.stringify(val)); })
    this.store.select(selectEntities).subscribe(val => { console.log(">>>>>>>" + JSON.stringify(val)); })
    this.store.select(selectBasicInfo).subscribe(val => { console.log(">>>>>>>" + JSON.stringify(val)); })
  }
  // @ViewChild("domain.prefix") prefix: viewchi;
  // domain = { prefix: "" };
}
