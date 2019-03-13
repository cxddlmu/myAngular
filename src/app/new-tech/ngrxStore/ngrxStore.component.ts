import { Component, OnInit } from '@angular/core';
import { Action, createFeatureSelector } from '@ngrx/store';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { NgrxStoreService } from './ngrxStore.service';
import * as _ from 'lodash'
@Component({
  selector: 'app-ngrxStore',
  templateUrl: './ngrxStore.component.html',
  styleUrls: ['./ngrxStore.component.css']
})
export class NgrxStoreComponent implements OnInit {
  ngOnInit() {
    this.store.select(selectFeatureCount).subscribe(val => { console.log(">>>>>>>" + JSON.stringify(val)); })

  }
  count$: Observable<number>;
  behaviorSubject: BehaviorSubject<number>;

  constructor(private store: Store<AppState>, private ngrxStoreService: NgrxStoreService) {

  }
  // subscribeCount(): Observable<number> {
  //   this.behaviorSubject = new BehaviorSubject(0);
  //   this.count$ = this.store.pipe(select('count'));
  //   this.count$.subscribe(val => {console.log("subscribeCount");this.behaviorSubject.next(val)});
  //   return this.behaviorSubject;
  // }
  increment() {
    this.store.dispatch({ type: INCREMENT });
    // this.store.dispatch(new setAge(1));
  }
  incrementX(val) {
    this.store.dispatch({ type: INCREMENTX, payload: val });
    // this.testIssue();

    // this.store.dispatch({ type: SET_AGE, payload: val });
    // this.testIssue1();
  }
  subscription = new Subscription();
  testIssue() {
    //no need to unsubscribe(); it is behaviorSubject or subject
    this.subscription.add(this.ngrxStoreService.subscribeCount().subscribe(val => console.log("subscribe" + val)));
    // this.subscription.unsubscribe();
    console.log(this.subscription);
    // subscription.unsubscribe();
    // this.subscribeCount().toPromise().then(val => console.log("toPromise" + val));
    console.log((this.ngrxStoreService.subscribeCount() as BehaviorSubject<number>).value);
    // this.subscribeCount().pipe(do(val=>console.log(val)));
  }
  testIssue1() {
    //need to unsubscribe()
    let subscription = this.ngrxStoreService.subscribeCount1().subscribe(val => console.log("subscribe" + val));

  }
  decrement() {
    this.store.dispatch({ type: DECREMENT });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }

}

export const INCREMENT = 'INCREMENT';
export const INCREMENTX = 'INCREMENTX';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const SET_AGE = 'SET_AGE';
export const SET_SCHOOL_NAME = 'SET_SCHOOL_NAME';
interface AppState {
  count: number;
  person: {
    name: string
    age: number
  };
  school: {
    name: string
  }
}
const initialState = { count: 0, person: { name: 'name', age: 0 },school:{name:'schoolname'} };

export function counterReducer(state = initialState, action: AllActions) {
  switch (action.type) {
    case INCREMENT:
      // console.log(state);
      state.count + state.count + 1;
      return { ...state };

    case DECREMENT:
      state.count - 1;
      return state;
    case RESET:
      return { count: 0, age: 0 };
    case INCREMENTX:
      state.count = state.count + action.payload;
      return { ...state };
    case SET_AGE:
      state.person.age = state.person.age + action.payload;
      state.person = _.cloneDeep(state.person);
      return state;
    case SET_SCHOOL_NAME:
      state.school.name = action.payload;
      return _.cloneDeep(state)
    default:
      return state;
  }
}
export class incrementX implements Action {
  readonly type = INCREMENTX;
  constructor(public payload: number) { }
}
export class increment implements Action {
  readonly type = INCREMENT;
  constructor(public payload: number) { }
}
export class decrement implements Action {
  readonly type = DECREMENT;
  constructor(public payload: number) { }
}
export class reset implements Action {
  readonly type = RESET;
  constructor(public payload: number) { }
}
export class setAge implements Action {
  readonly type = SET_AGE;
  constructor(public payload: number) { }
}
export class setSchoolName implements Action {
  readonly type = SET_SCHOOL_NAME;
  constructor(public payload: string) { }
}
export type AllActions = incrementX | increment | reset | decrement | setAge | setSchoolName;
export interface Person {
  name: string;
  age: number;
}
export interface School {
  name: string;
  age: number;
}
// export const selectFeature = (state: AppState) => state.person;
export const root = createFeatureSelector<any>('countroot');
export const selectFeatureCount = createSelector(
  root,
  (person: School) => person
);
