import { Component, OnInit } from '@angular/core';
import _ from 'lodash'
@Component({
  selector: 'app-lodash',
  //templateUrl: './lodash.component.html',
  //styleUrls: ['./lodash.component.css']
})
export class LodashComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let log = console.log;
    let obj = { a: 'A', b: 'B', c: [{ d: 'D' }, { e: 'E' }], f: { g: 'G' }, 1: 1, '': '' }
    log(_.hasIn(obj, 'c[0].e'));//false
    log(_.hasIn(obj, 'f.g'));//true
    log(_.hasIn(obj, ['f', 'g']));//true
    let other = _.create({ 'a': _.create({ 'b': 2 }),f:{g:'G1'},1:'one' });
    let other1 = { a: 'A1', b: 'B', c: [{ d: 'D' }, { e: 'E' }], f: { g: 'G' }, 1: 1, '': '' }
    log(_.hasIn(other, 'a.b'));//true
    log("-------------------------------")
    log(_.create({ 'b': 2 }))//prototype
    log(_.some(obj, 'g'))//true
    log(_.some(obj, ['g', 'G']))//true
    log(_.some(obj, 'd'))//false
    //size
    log("1313".length)
    log(Object.keys(obj).length)
    log(_.size(obj))

    log(_.isObject({}))//arrays, functions, objects, regexes, new Number(0), and new String('')
    log(_.isObjectLike({}))//it's not null and has a typeof result of "object".
    log(_.isPlainObject({}))//an object created by the Object constructor or one with a [[Prototype]] of null.
    log(_.isObject([]))
    log(_.isObjectLike([]))
    log(_.isPlainObject([]))

    log(_.isObject(_.noop))//true
    log(_.isObjectLike(_.noop))
    log(_.isPlainObject(_.noop))




    log(_.merge(obj, other1));
    log(_.defaultsDeep(obj, other1));
    log(_.merge({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }));
    log(_.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }));
    log(_.merge({ a: 'A', b: 'B', c: [{ d: 'D' }, { e: 'E' }], f: { g: 'G' }, 1: 1, '': '' 
  }, { a: 'A1', b: 'B', c: [{ d: 'D' }, { e: 'E' }], f: { g: 'G1' }, 1: 1, '': '' }));
    log(_.defaultsDeep({ a: 'A', b: 'B', c: [{ d: 'D' }, { e: 'E' }], f: { g: 'G' }, 1: 1, '': '' 
  }, { a: 'A1', b: 'B', c: [{ d: 'D' }, { e: 'E' }], f: { g: 'G1' }, 1: 1, '': '' }));

  }

}
