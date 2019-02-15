/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgrxStoreService } from './ngrxStore.service';

describe('Service: NgrxStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgrxStoreService]
    });
  });

  it('should ...', inject([NgrxStoreService], (service: NgrxStoreService) => {
    expect(service).toBeTruthy();
  }));
});