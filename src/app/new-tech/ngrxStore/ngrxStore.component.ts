import { Component, OnInit } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import { createSelector } from '@ngrx/store';

@Component({
  selector: 'app-ngrxStore',
  templateUrl: './ngrxStore.component.html',
  styleUrls: ['./ngrxStore.component.css']
})
export class NgrxStoreComponent implements OnInit {
  ngOnInit() {

  }
  count$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.count$ = store.pipe(select('count'));
  }

  increment() {
    this.store.dispatch({ type: INCREMENT });
  }
  incrementX(val) {
    this.store.dispatch({ type: INCREMENTX, payload: val });
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
interface AppState {
  count: number;
}
const initialState = 0;
export function counterReducer(state: number = initialState, action: AllActions) {
  switch (action.type) {
    case INCREMENT:
      console.log(state);
      return state + 1;

    case DECREMENT:
      return state - 1;

    case RESET:
      return 0;

    case INCREMENTX:
      return state + action.payload;

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
export type AllActions = incrementX | increment | reset | decrement;
