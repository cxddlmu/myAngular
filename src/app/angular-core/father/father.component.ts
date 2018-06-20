import { Component, OnInit, SimpleChanges, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
  styleUrls: ['./father.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FatherComponent implements OnInit {

  @Input() age: number;
  @Input() resumes: Array<any>

  testRxjs() {
    var observable = Observable.create(function (observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });
    observable.subscribe(
      value => console.log(value),
      err => { },
      () => console.log('this is the end')
    );
  }
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
