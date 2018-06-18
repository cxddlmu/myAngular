import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-daughter',
  templateUrl: './daughter.component.html',
  styleUrls: ['./daughter.component.css']
})
export class DaughterComponent implements OnInit {

  public sing(){
    console.log(this.componentName+"-sing");
  }
  componentName = "DaughterComponent";
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

  ngOnInit() {
    console.log(this.componentName+"-ngOnInit");

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.componentName+"-ngOnChanges");
  }

}
