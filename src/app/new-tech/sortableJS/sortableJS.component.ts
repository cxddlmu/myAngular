import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-sortableJS',
  templateUrl: './sortableJS.component.html',
  // styleUrls: ['./sortableJS.component.css']
})
export class SortableJSComponent implements OnInit {

  options;
  constructor() { }

  items = [1, 2, 3, 4, 5];
  ngOnInit() {
    from(this.items).subscribe(() => {
      console.log(this.items);
    });
    this.options = { handle: '.handle', filter: '.filtered',onUpdate: (event: any) => {
      //  console.log(event);
    },setData:(/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl)=>{
      console.log(dragEl);
      console.log(dataTransfer);
    } }
  }

}