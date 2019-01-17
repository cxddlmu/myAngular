import { Component, OnInit } from '@angular/core';

import MagicGrid from "magic-grid"



@Component({
  selector: 'magic-grid',
  templateUrl: './magic-grid.component.html'
})
export class MagicGridComponent implements OnInit {
    
    ngOnInit() {
        console.log("MagicGridComponent");
        let magicGrid = new MagicGrid({
          container: "#container", // Required. Can be a class, id, or an HTMLElement.
          items: 20, // For a grid with 20 items. Required for dynamic content.
          animate: true, // Optional.
          maxColumns:20,
          useMin:false
        });
        
        magicGrid.listen();
      }
}