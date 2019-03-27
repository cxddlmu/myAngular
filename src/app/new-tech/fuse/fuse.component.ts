import { Component, OnInit } from '@angular/core';
import Fuse from 'fuse.js'
@Component({
  selector: 'app-fuse',
  templateUrl: './fuse.component.html',
  // styleUrls: ['./fuse.component.css']
})
export class FuseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var books = [{
      'title': "Old Man's War",
      'author': 'John Scalzi',
      'tags': ['fiction']
    }, {
      'title': 'The Lock Artist',
      'author': 'Steve',
      'tags': ['thriller']
    }]
    var options: Fuse.FuseOptions<any> = {
      keys: ['author', 'tags']
    };
    var fuse = new Fuse(books, options)

    console.log(fuse.search('tion'))
  }

}