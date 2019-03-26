import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-material2Form',
  templateUrl: './material2Form.component.html',
  styleUrls: ['./material2Form.component.css']
})
export class Material2FormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input() label: string;
  @Input() start: any;
  @Input() end: any;
  prefixList = [
    { key:1,value:"value1"},
    { key:2,value:"value2"},
  ]
}
