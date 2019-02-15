import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-demo',
  templateUrl: './my-demo.component.html',
  styleUrls: ['./my-demo.component.css']
})
export class MyDemoComponent implements OnInit {

  constructor() { }
  fontSize: number;
  fontColor: number;
  ngOnInit() {
  }
  fontSizeChange(value) {
    console.log(value)
    this.fontSize = value;
  }
  fontColorChange(value) {
    console.log(value)
    this.fontColor = value;
  }

}
