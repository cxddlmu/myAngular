import { Component, OnInit, SimpleChanges, ViewContainerRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.css']
})
export class SonComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.componentName+"-ngOnInit");
  }
  componentName = "SonComponent";


  playGame(){
    console.log(this.componentName+"-playGame");
  }

  ngDoCheck(): void {
    console.log(this.componentName+"-ngDoCheck");
  }
  ngAfterContentInit(): void {
    console.log(this.componentName+"-ngAfterContentInit");
  }
  ngAfterViewInit(): void {
    console.log(this.componentName+"-ngAfterViewInit");
  }
  ngAfterContentChecked(): void {
    console.log(this.componentName+"-ngAfterContentChecked");
  }
  ngAfterViewChecked(): void {
    console.log(this.componentName+"-ngAfterViewChecked");
  }
  ngOnDestroy(): void {
    console.log(this.componentName+"-ngOnDestroy");
  }

  constructor() {
    console.log(this.componentName+"-constructor");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.componentName+"-ngOnChanges");
  }

}
