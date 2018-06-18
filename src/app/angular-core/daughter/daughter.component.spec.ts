/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DaughterComponent } from './daughter.component';

describe('DaughterComponent', () => {
  let component: DaughterComponent;
  let fixture: ComponentFixture<DaughterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaughterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaughterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
