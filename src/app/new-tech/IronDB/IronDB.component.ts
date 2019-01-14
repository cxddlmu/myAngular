import { Component, OnInit } from '@angular/core';
import { ImmortalDB  } from 'immortal-db'

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
    ImmortalDB.set('hi', 'bonjour')
    console.log(await ImmortalDB.get('hi'))  // Prints 'bonjour'.

    await ImmortalDB.remove('hi')

    console.log(await ImmortalDB.get('hi')) // Prints 'null'.
    return "ironDB test";
  }
}
