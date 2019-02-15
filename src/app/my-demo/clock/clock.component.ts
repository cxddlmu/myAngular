import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as fecha from 'fecha'

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnChanges {
  @Input() fontSize: number;
  @Input() fontColor: string;

  constructor() { }
  currentTime: string;
  ngOnInit() {
    setInterval(() => {
      this.currentTime = fecha.default.format(new Date(), 'HH:mm:ss')
    }, 1000)
  }
  ngOnChanges() {
    console.log(this.fontSize)
  }


}
