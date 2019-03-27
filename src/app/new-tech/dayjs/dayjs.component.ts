import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs'
import {DateTime} from 'luxon'
import fecha from 'fecha'
@Component({
  selector: 'app-dayjs',
  templateUrl: './dayjs.component.html',
  // styleUrls: ['./dayjs.component.css']
})
export class DayjsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let log = console.log;
    log(typeof dayjs('2018-08-08')) // parse

    log(dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A')) // display

    log(dayjs().set('month', 3).month()) // get & set

    log(dayjs().add(1, 'year')) // manipulate

    log(dayjs().isBefore(dayjs())) // query

    log(dayjs().month());
    log(dayjs().day());
    log(dayjs().daysInMonth());
    log(dayjs().locale('CH'));
    log(dayjs().locale('US'));
    log(dayjs(new Date()))

    log(DateTime.local().month)
    log(DateTime.local().day)
    log(DateTime.local().daysInMonth)

    fecha.format(new Date(2015, 10, 20), 'dddd MMMM Do, YYYY');
    log(dayjs().startOf('month').set('year', 2018).format('YYYY-MM-DD HH:mm:ss'));
  }

}