/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanDeactivateService } from './canDeactivate.service';

describe('Service: CanDeactivate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateService]
    });
  });

  it('should ...', inject([CanDeactivateService], (service: CanDeactivateService) => {
    expect(service).toBeTruthy();
  }));
});
