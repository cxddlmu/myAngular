import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  @Output() fontSizeChange = new EventEmitter();
  @Output() fontColorChange = new EventEmitter();
  fontSize:number
  ngOnInit() {
  }
  changeFontSize(value){
    this.fontSizeChange.emit(value);
  }
  changeFontColor(value){
    this.fontColorChange.emit(value);
  }
}
