/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgrxEffectsService } from './ngrxEffects.service';

describe('Service: NgrxEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgrxEffectsService]
    });
  });

  it('should ...', inject([NgrxEffectsService], (service: NgrxEffectsService) => {
    expect(service).toBeTruthy();
  }));
});