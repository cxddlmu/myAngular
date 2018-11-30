import { Component, OnInit } from '@angular/core';
import { IronDB } from 'iron-db'

@Component({
  selector: 'app-IronDB',
  templateUrl: './IronDB.component.html',
  styleUrls: ['./IronDB.component.css']
})
export class IronDBComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.test().then((val)=>{
      console.log(val)
    })
  }

  async test(){
    IronDB.set('hi', 'bonjour')
    console.log(await IronDB.get('hi'))  // Prints 'bonjour'.

    await IronDB.remove('hi')

    console.log(await IronDB.get('hi')) // Prints 'null'.
    return "ironDB test";
  }
}
