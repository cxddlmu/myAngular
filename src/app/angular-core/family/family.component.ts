import { Component, ChangeDetectionStrategy,OnInit, SimpleChanges, Input, ViewChild, ViewContainerRef, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { DaughterComponent } from '../daughter/daughter.component';
import { SonComponent } from '../son/son.component';
import "reflect-metadata";
import { RequiredField, mapClass, mappedClass} from "../../shared/annotation/model-annotation"
import { PersonalInfo } from '../../shared/model/personal-info';
import {CustomPipe} from "../../shared/pipe/custom.pipe"


@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyComponent{
    
    @Input() personalInfo: PersonalInfo;
  @Input() resumes: Array<any>;
  @ViewChild("daughter") daughter: DaughterComponent;
  @ViewChild("son") son: SonComponent;
  @ViewChild("motherTemplate", { read: TemplateRef }) motherTemplate: TemplateRef<any>//read 强制类型 转换
  @ViewChild("motherContainer", { read: ViewContainerRef }) motherContainer: ViewContainerRef
  today = new Date();
  constructor(private viewContainerRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef) {
    console.log(this.componentName + "-constructor");
      this.getMetaData();
  }

  getMetaData(){
    let personalInfo = new PersonalInfo();
    let keys = Reflect.getMetadataKeys(personalInfo, "name"); //获取所有的 Attribute
    let value = Reflect.getMetadata(keys[1], personalInfo, "name"); //key[0] is "design:type" build in 的
    let type = Reflect.getMetadata(keys[0], personalInfo, "name"); //get by symbol
    console.log(keys);
    console.log(value);
    console.log(type);
    console.log(Reflect.hasMetadata(RequiredField,personalInfo,"name"));
    let keys1 = Reflect.getMetadataKeys(personalInfo.constructor); 
    let result = Reflect.getMetadata(keys1[0],personalInfo.constructor); //使用的是 constructro 哦
    console.log(result);
  }

  componentName = "FamilyComponent";
  ngAfterViewInit(): void {
    console.log(this.componentName + "-ngAfterViewInit");
    this.son.playGame();
    this.daughter.sing();
    // let embeddedView = this.motherTemplate.createEmbeddedView(null); 
    let embeddedView = this.motherContainer.createEmbeddedView(this.motherTemplate);//alternative
    // this.motherContainer.insert(embeddedView,0);
    // embeddedView.detectChanges();
  }
}