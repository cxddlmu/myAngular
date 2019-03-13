import { O } from '@angular/cdk/keycodes/typings';
import { Component, OnInit } from '@angular/core';
import { Observable, interval, from, of, ConnectableObservable, Subscription, Subject, ReplaySubject, AsyncSubject, BehaviorSubject } from 'rxjs';
import { map, publish, refCount, share, publishLast, shareReplay } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { take } from 'rxjs/internal/operators/take';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit {

  ngOnInit() {
    console.log("rxjs1");
    //hot publish connect
    //hot call once
    let obsHot1 = Observable.create(observer => {let now = Date.now();console.log("hot: " + now);observer.next(now)}).pipe(publish()) as ConnectableObservable<any>
    obsHot1.subscribe(v => console.log("1st subscriber hot: " + v));
    obsHot1.subscribe(v => console.log("2nd subscriber hot: " + v));
    obsHot1.connect()

        let obsHot2 = Observable.create(observer => {let now = Date.now();console.log("hot2: " + now);observer.next(now)}).pipe(shareReplay()) as ConnectableObservable<any>
    obsHot1.subscribe(v => console.log("1st subscriber hot2: " + v));
    obsHot1.subscribe(v => console.log("2nd subscriber hot2: " + v));
    ///cold call twice
    //cold whatever from the beginning value
    /**
     * rxjs.component.ts:16 hot: 1551856489775
15:14:49.776 rxjs.component.ts:17 1st subscriber hot: 1551856489775
15:14:49.777 rxjs.component.ts:18 2nd subscriber hot: 1551856489775
15:14:49.778 rxjs.component.ts:24 cold: 1551856489779
15:14:49.779 rxjs.component.ts:25 1st subscriber cold: 1551856489779
15:14:49.780 rxjs.component.ts:24 cold: 1551856489780
15:14:49.781 rxjs.component.ts:26 2nd subscriber cold: 1551856489780
     * 
     * 
     */

    let obsCold1 = Observable.create(observer => {let now = Date.now();console.log("cold: " + now);observer.next(now)}) as Observable<any>
    obsCold1.subscribe(v => console.log("1st subscriber cold: " + v));
    obsCold1.subscribe(v => console.log("2nd subscriber cold: " + v));

//////
    let obsHot = interval(1000).pipe(take(5), publish()) as ConnectableObservable<any>
    obsHot.connect();
    setTimeout(() => {
      this.subscripton.add(obsHot.subscribe(v => console.log("1st subscriber obsHot:" + v)));
      setTimeout(
        () => this.subscripton.add(obsHot.subscribe(v => console.log("2nd subscriber obsHot:" + v)))
        , 1000);
    }, 2000);
    //warm pulish refcount
    // warm when it begin, the second one get from the first one's current value
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
    //warm --share
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

    this.rxjsTest();

  }
  rxjsTest() {
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
    //cache last value,if have more value once, return the last value
    //if complete is invoked, new next value can not be got
    var asyncSubject = new AsyncSubject();

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
    subject.next(`${new Date()}-------subject3`);//no effective     //subject: subscribe first, then next. subject has not cache

    subject.subscribe(observerA);
    behaviorSubject.next(`${new Date()}-------behaviorSubject-6`);//effective before subscribe
    behaviorSubject.subscribe(observerA);//default value ---- behaviorSubject
    // console.log(behaviorSubject.value);//default value ---- behaviorSubject
    // console.log(behaviorSubject.getValue());//default value ---- behaviorSubject
    // asyncSubject.next(`${new Date()}-------asyncSubject-6`);//work
    // asyncSubject.complete(); //effective before subscribe
    asyncSubject.subscribe(observerA);
    replaySubject.next(`${new Date()}-------replaySubject5`);//work
    replaySubject.subscribe(observerA);

    // if uncomment below rows, new next value do not work
    // replaySubject.complete();

    subject.next(`${new Date()}-------subject1`);
    //if uncomment below rows, new subscription can not be added , subscriber is closed, the new can not work in the subject
    // subject.complete();
    asyncSubject.next(`${new Date()}-------asyncSubject1`);
    asyncSubject.next(`${new Date()}-------asyncSubject2`);
    asyncSubject.error(`${new Date()}-------asyncSubject2`);
    asyncSubject.complete(); // if complete is commented , no value will be got
    asyncSubject.next(`${new Date()}-------asyncSubject3`);//not effective
    replaySubject.next(`${new Date()}-------replaySubject1`);
    replaySubject.next(`${new Date()}-------replaySubject2`);
    replaySubject.next(`${new Date()}-------replaySubject3`);
    behaviorSubject.next(`${new Date()}-------behaviorSubject1`);
    // if complete is uncommented , new subscription can not be added, new value can not be capture
    // behaviorSubject.complete();

    //subscribe will exec immediately
    setTimeout(() => {
      subject.subscribe(observerB); // 1秒后订阅 can not invoke, can only get value after subscribe
      behaviorSubject.subscribe(observerB); // 1秒后订阅 
      replaySubject.subscribe(observerB); // 1秒后订阅 
      asyncSubject.subscribe(observerB); // 1秒后订阅 
      asyncSubject.next(`${new Date()}-------asyncSubject4`);// not effective
      behaviorSubject.next(`${new Date()}-------behaviorSubject2`);
      replaySubject.next(`${new Date()}-------replaySubject4`);
      subject.next(`${new Date()}-------subject2`);
    }, 1000);
  }

}
