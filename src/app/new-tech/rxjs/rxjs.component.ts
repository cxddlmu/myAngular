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

    //cold whatever from the beginning value
    let obsHot = interval(1000).pipe(take(5), publish()) as ConnectableObservable<any>
    obsHot.connect();
    setTimeout(() => {
      this.subscripton.add(obsHot.subscribe(v => console.log("1st subscriber obsHot:" + v)));
      setTimeout(
        () => this.subscripton.add(obsHot.subscribe(v => console.log("2nd subscriber obsHot:" + v)))
        , 1000);
    }, 2000);
    // warm when it begin the second one get from the first one current value
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
    //with share the same as publish(), refCount()
    let obsWarm1 = interval(1000).pipe(take(5), share()) as ConnectableObservable<any>
    setTimeout(() => {
      this.subscripton.add(obsWarm1.subscribe(v => console.log("1st subscriber obsWarm1:" + v)));
      setTimeout(
        () => this.subscripton.add(obsWarm1.subscribe(v => console.log("2nd subscriber obsWarm1:" + v)))
        , 1000);
    }, 2000);
    /*
                                  1st subscriber obsHot:2
15:00:55.137 rxjs.component.ts:39 1st subscriber obsWarm:0
15:00:55.145 rxjs.component.ts:47 1st subscriber obsCold:0
15:00:55.149 rxjs.component.ts:55 1st subscriber obsWarm1:0
15:00:56.130 rxjs.component.ts:31 1st subscriber obsHot:3
15:00:56.133 rxjs.component.ts:33 2nd subscriber obsHot:3
15:00:56.138 rxjs.component.ts:39 1st subscriber obsWarm:1
15:00:56.146 rxjs.component.ts:41 2nd subscriber obsWarm:1
15:00:56.158 rxjs.component.ts:47 1st subscriber obsCold:1
15:00:56.163 rxjs.component.ts:55 1st subscriber obsWarm1:1
15:00:56.164 rxjs.component.ts:57 2nd subscriber obsWarm1:1
15:00:56.167 rxjs.component.ts:49 2nd subscriber obsCold:0
15:00:57.130 rxjs.component.ts:31 1st subscriber obsHot:4
15:00:57.131 rxjs.component.ts:33 2nd subscriber obsHot:4
15:00:57.136 rxjs.component.ts:39 1st subscriber obsWarm:2
15:00:57.139 rxjs.component.ts:41 2nd subscriber obsWarm:2
15:00:57.144 rxjs.component.ts:47 1st subscriber obsCold:2
15:00:57.152 rxjs.component.ts:55 1st subscriber obsWarm1:2
15:00:57.155 rxjs.component.ts:57 2nd subscriber obsWarm1:2
15:00:57.158 rxjs.component.ts:49 2nd subscriber obsCold:1
15:00:58.137 rxjs.component.ts:39 1st subscriber obsWarm:3
15:00:58.140 rxjs.component.ts:41 2nd subscriber obsWarm:3
15:00:58.146 rxjs.component.ts:47 1st subscriber obsCold:3
15:00:58.165 rxjs.component.ts:55 1st subscriber obsWarm1:3
15:00:58.168 rxjs.component.ts:57 2nd subscriber obsWarm1:3
15:00:58.172 rxjs.component.ts:49 2nd subscriber obsCold:2
15:00:59.136 rxjs.component.ts:39 1st subscriber obsWarm:4


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
    var asyncSubject = new AsyncSubject();//cache last value,if have more value once, return the last value
    var replaySubject = new ReplaySubject(2);
    var behaviorSubject = new BehaviorSubject(`default value ---- behaviorSubject`);//default value and last value

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

    //subject: subscribe first then next.behaviorSubject: behaviorSubject not need
    subject.subscribe(observerA);
    behaviorSubject.subscribe(observerA);
    console.log(behaviorSubject.value);
    asyncSubject.subscribe(observerA);
    replaySubject.subscribe(observerA);
    // if uncomment these before method next the first subscribe will not work,but settimeout work
    //replaySubject.complete();
    //subject.complete();

    subject.next(`${new Date()}-------subject`);
    asyncSubject.next(`${new Date()}-------asyncSubject`);
    asyncSubject.next(`${new Date()}-------asyncSubject`);
    asyncSubject.complete(); // if complete is commented , no value will be got
    replaySubject.next(`${new Date()}-------replaySubject`);
    replaySubject.next(`${new Date()}-------replaySubject`);
    replaySubject.next(`${new Date()}-------replaySubject`);
    behaviorSubject.next(`${new Date()}-------behaviorSubject`);
    // behaviorSubject.next(`${new Date()}-------behaviorSubject`);
    // behaviorSubject.complete();// if complete is uncommented , none new subscription can not be added, new value can not be capture

    //subscribe will exec immediately
    setTimeout(() => {
      subject.subscribe(observerB); // 1秒后订阅 can not invoke
      behaviorSubject.subscribe(observerB); // 1秒后订阅 
      replaySubject.subscribe(observerB); // 1秒后订阅 
      asyncSubject.subscribe(observerB); // 1秒后订阅 
    }, 1000);


  }
}
