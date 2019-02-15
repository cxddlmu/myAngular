import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { EMPTY, Observable, Subject, of } from 'rxjs';

@Injectable()
export class NgrxStoreService {

    getRandomNumber() {
        console.log("NgrxStoreService.getAll");
        return of(this.getRandomIntInclusive(1,10))
    }
    private getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
}