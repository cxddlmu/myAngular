import { O } from '@angular/cdk/keycodes/typings';
import { Component, OnInit } from '@angular/core';
import { Observable, interval, from, of, ConnectableObservable, Subscription, Subject, ReplaySubject, AsyncSubject, BehaviorSubject } from 'rxjs';
import { map, publish, refCount, share, publishLast } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { take } from 'rxjs/internal/operators/take';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit {

  ngOnInit() {
    console.log("rxjs1");
    ///cold call twice
    // 1st subscriber hot: 1547789876809
    // 2nd subscriber hot: 1547789876809
    let obsHot1 = Observable.create(observer => observer.next(Date.now())).pipe(publish()) as ConnectableObservable<any>
    obsHot1.subscribe(v => console.log("1st subscriber hot: " + v));
    obsHot1.subscribe(v => console.log("2nd subscriber hot: " + v));
    obsHot1.connect()
    
    let obsCold1 = Observable.create(observer => observer.next(Date.now())) as Observable<any>
    obsCold1.subscribe(v => console.log("1st subscriber cold: " + v));
    obsCold1.subscribe(v => console.log("2nd subscriber cold: " + v));
    
    //
    let obsHot = interval(1000).pipe(take(5), publish()) as ConnectableObservable<any>
    obsHot.connect();
    setTimeout(() => {
      this.subscripton.add(obsHot.subscribe(v => console.log("1st subscriber obsHot:" + v)));
      setTimeout(
        () => this.subscripton.add(obsHot.subscribe(v => console.log("2nd subscriber obsHot:" + v)))
        , 1000);
    }, 2000);
    //
    let obsWarm = interval(1000).pipe(take(5), publish(), refCount()) as ConnectableObservable<any>
    setTimeout(() => {
      this.subscripton.add(obsWarm.subscribe(v => console.log("1st subscriber obsWarm:" + v)));
      setTimeout(
        () => this.subscripton.add(obsWarm.subscribe(v => console.log("2nd subscriber obsWarm:" + v)))
        , 1000);
    }, 2000);
    //
    let obsCold = interval(1000).pipe(take(5)) as ConnectableObservable<any>
    setTimeout(() => {
      this.subscripton.add(obsCold.subscribe(v => console.log("1st subscriber obsCold:" + v)));
      setTimeout(
        () => this.subscripton.add(obsCold.subscribe(v => console.log("2nd subscriber obsCold:" + v)))
        , 1000);
    }, 2000);
    //with share
    let obsWarm1 = interval(1000).pipe(take(5), share()) as ConnectableObservable<any>
    setTimeout(() => {
      this.subscripton.add(obsWarm1.subscribe(v => console.log("1st subscriber obsWarm1:" + v)));
      setTimeout(
        () => this.subscripton.add(obsWarm1.subscribe(v => console.log("2nd subscriber obsWarm1:" + v)))
        , 1000);
    }, 2000);
    /*
      14:46:02.088 rxjs.component.ts:35 1st subscriber obsHot:2
14:46:02.088 rxjs.component.ts:35 1st subscriber obsWarm:0
14:46:02.092 rxjs.component.ts:41 1st subscriber obsCold:0
14:46:03.079 rxjs.component.ts:29 1st subscriber obsHot:3
14:46:03.081 rxjs.component.ts:31 2nd subscriber obsHot:3
14:46:03.087 rxjs.component.ts:35 1st subscriber obsWarm:1
14:46:03.089 rxjs.component.ts:37 2nd subscriber obsWarm:1
14:46:03.093 rxjs.component.ts:41 1st subscriber obsCold:1
14:46:03.096 rxjs.component.ts:43 2nd subscriber obsCold:0
14:46:04.079 rxjs.component.ts:29 1st subscriber obsHot:4
14:46:04.081 rxjs.component.ts:31 2nd subscriber obsHot:4
14:46:04.084 rxjs.component.ts:35 1st subscriber obsWarm:2
14:46:04.086 rxjs.component.ts:37 2nd subscriber obsWarm:2
14:46:04.090 rxjs.component.ts:41 1st subscriber obsCold:2
14:46:04.094 rxjs.component.ts:43 2nd subscriber obsCold:1
14:46:05.079 rxjs.component.ts:29 1st subscriber obsHot:5
14:46:05.081 rxjs.component.ts:31 2nd subscriber obsHot:5
14:46:05.084 rxjs.component.ts:35 1st subscriber obsWarm:3
14:46:05.087 rxjs.component.ts:37 2nd subscriber obsWarm:3
14:46:05.090 rxjs.component.ts:41 1st subscriber obsCold:3
14:46:05.095 rxjs.component.ts:43 2nd subscriber obsCold:2
14:46:06.079 rxjs.component.ts:29 1st subscriber obsHot:6


    */
  }
  subscripton: Subscription = new Subscription();
  ngOnDestroy(): void {
    // console.log(this.componentName + "-ngOnDestroy");
    this.subscripton.unsubscribe();
  }
  contacts: Observable<Array<any>>;
  contacts2: Observable<Array<any>>;
  contacts1: Observable<Array<any>>;
  constructor(private http: HttpClient) {

  }
  ngAfterViewInit(): void {
    // will call twice
    //this.contacts = this.http.get('assets/response.json').pipe(map((response: any) => response['items']))
    // will call once
    this.contacts = this.http.get('assets/response.json').pipe(map((response: any) => response['items'])
      , publish()
      , refCount())
    //another way to avoid call api twice
    // this.contacts = from(this.http.get('assets/response.json').toPromise().then((response: any) => response['items']));


    //if we do not use publishLast, the contacts2 wil not get the value
    this.contacts1 = this.http.get('assets/response.json').pipe(map((response: any) => response['items'])
      , publishLast()
      , refCount())

    setTimeout(() => this.contacts2 = this.contacts1, 500);

    var subject = new Subject();
    var behaviorSubject = new BehaviorSubject(`null ---- behaviorSubject`);

    var observerA = {
      next: value => console.log('Observer A get value: ' + value),
      error: error => console.log('Observer A error: ' + error),
      complete: () => console.log('Observer A complete!')
    };

    var observerB = {
      next: value => console.log('Observer B get value: ' + value),
      error: error => console.log('Observer B error: ' + error),
      complete: () => console.log('Observer B complete!')
    };

    subject.subscribe(observerA);
    behaviorSubject.subscribe(observerA);
    subject.next(`${new Date()}-------subject`);
    behaviorSubject.next(`${new Date()}-------behaviorSubject`);
    behaviorSubject.next(`${new Date()}-------behaviorSubject`);
    // behaviorSubject.complete();// if complete is uncommented , none new subscription can not be added, new value can not be capture
    setTimeout(() => {
      subject.subscribe(observerB); // 1秒后订阅 can not invoke
      behaviorSubject.subscribe(observerB); // 1秒后订阅
    }, 1000);
    //BehaviorSubject default value and last value
    //ReplaySubject(3)
    new ReplaySubject(3)
    new AsyncSubject//last value
  }
}
