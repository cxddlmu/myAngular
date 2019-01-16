import { Component, OnInit } from '@angular/core';
import * as stringSimilarity from 'string-similarity'



@Component({
  selector: 'string-similarity',
  templateUrl: './string-similarity.component.html'
})
export class StringSimilarityComponent implements OnInit {
    
    ngOnInit() {
        console.log("StringSimilarity");
        let similarity = stringSimilarity.compareTwoStrings('healed', 'sealed'); 
        console.log(similarity);
        let test = stringSimilarity.findBestMatch('Olive-green table for sale, in extremely good condition.', [
  'For sale: green Subaru Impreza, 210,000 miles', 
  'For sale: table in very good condition, olive green in colour.', 
  'Wanted: mountain bike with at least 21 gears.'
]);
        console.log(test);
      }
}