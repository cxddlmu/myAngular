import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-grandmother',
  templateUrl: './grandmother.component.html',
  styleUrls: ['./grandmother.component.css']
})
export class GrandmotherComponent implements OnInit {

 
  componentName = "GrandmotherComponent";
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
