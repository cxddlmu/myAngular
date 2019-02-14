import { Component, OnInit } from '@angular/core';
import alasql from 'alasql'
@Component({
  selector: 'app-alasql',
  templateUrl: './alasql.component.html',
  styleUrls: ['./alasql.component.css']
})
export class AlasqlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    alasql("CREATE TABLE cities (city string, pop number)");
    alasql("INSERT INTO cities VALUES ('Paris',2249975),('Berlin',3517424),('Madrid',3041579)");
    let res = alasql("SELECT * FROM cities WHERE pop < 3500000 ORDER BY pop DESC");
    console.log(res);
    let data = [{ a: 1, b: 10 }, { a: 2, b: 20 }, { a: 1, b: 30 }];

    let res1 = alasql('SELECT a, SUM(b) AS b FROM ? GROUP BY a', [data]);
    console.log(res1);

    // alasql(['SELECT * FROM XLS("./data/mydata") WHERE lastname LIKE "A%" and city = "London" GROUP BY name '])
    //   .then(function (res) {
    //     console.log(res); // output depends on mydata.xls
    //   }).catch(function (err) {
    //     console.log('Does the file exist? There was an error:', err);
    //   });

    alasql.fn.testFuncA = function (a, b) {
      return a * b + 1;
    } as any
    let res2 = alasql('SELECT testFuncA(pop,pop) FROM cities');
    console.log(res2);
  }


}