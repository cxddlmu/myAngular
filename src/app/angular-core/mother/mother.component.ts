import { Component, OnInit, SimpleChanges, Input, ViewChild, ViewContainerRef, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { DaughterComponent } from '../daughter/daughter.component';
import { SonComponent } from '../son/son.component';
import "reflect-metadata";
import { RequiredField, mapClass, mappedClass} from "../../shared/annotation/model-annotation"
import { PersonalInfo } from '../../shared/model/personal-info';
import {CustomPipe} from "../../shared/pipe/custom.pipe"
@Component({
  selector: 'app-mother',
  templateUrl: './mother.component.html',
  styleUrls: ['./mother.component.css']
})
export class MotherComponent implements OnInit {
      componentName = "MotherComponent";
  constructor(private viewContainerRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef) {
    console.log(this.componentName + "-constructor");
  }
  ngDoCheck(): void {
    console.log(this.componentName + "-ngDoCheck");
  }
  ngAfterContentInit(): void {
    console.log(this.componentName + "-ngAfterContentInit");
  }
  ngAfterViewInit(): void {
    console.log(this.componentName + "-ngAfterViewInit");
  }
  ngAfterContentChecked(): void {
    console.log(this.componentName + "-ngAfterContentChecked");
  }
  ngAfterViewChecked(): void {
    console.log(this.componentName + "-ngAfterViewChecked");
  }
  ngOnDestroy(): void {
    console.log(this.componentName + "-ngOnDestroy");
  }



  ngOnInit() {
    console.log(this.componentName + "-ngOnInit");

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.componentName + "-ngOnChanges");
  }
}
