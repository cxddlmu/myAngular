import { Component, OnInit, SimpleChanges, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrls: ['./father.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FatherComponent implements OnInit {

  @Input() age: number;
  @Input() resumes: Array<any>


  componentName = "FatherComponent";
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

  constructor() {
    console.log(this.componentName + "-constructor");
  }

  ngOnInit() {
    console.log(this.componentName + "-ngOnInit");

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.componentName + "-ngOnChanges");
  }

}
