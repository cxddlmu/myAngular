import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { EMPTY, Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, take } from 'rxjs/operators';
interface AppState {
    count: number;
}
@Injectable()
export class NgrxStoreService {
    constructor(private store: Store<AppState>) {

    }
    count$: Observable<number>;
    behaviorSubject: BehaviorSubject<number>;
    getRandomNumber() {
        console.log("NgrxStoreService.getAll");
        return of(this.getRandomIntInclusive(1, 10))
    }
    private getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
    subscribeCount(): Observable<any> {
        let behaviorSubject = new BehaviorSubject(0);
        // let subscripton = this.store.select('count').subscribe(val => { console.log("subscribeCount"+val); behaviorSubject.next(val) });
        // subscripton.unsubscribe();
        let subscripton = this.store.select('count').pipe(take(1)).subscribe(val => { console.log("subscribeCount"+val); behaviorSubject.next(val) });
        return behaviorSubject;
    }

    subscribeCount1(): Observable<any> {
        // return this.store.select('count').pipe(map(count=>count*2));
        let subject = new Subject();
        // let subscripton = this.store.select('count').subscribe(val => { console.log("subscribeCount"+val); behaviorSubject.next(val) });
        // subscripton.unsubscribe();
        let subscripton = this.store.select('count').pipe(take(1)).subscribe(val => { console.log("subscribeCount"+val); subject.next(val) });
        return subject;
    }
    
}
