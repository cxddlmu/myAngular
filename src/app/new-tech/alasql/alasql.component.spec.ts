/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlasqlComponent } from './alasql.component';

describe('AlasqlComponent', () => {
  let component: AlasqlComponent;
  let fixture: ComponentFixture<AlasqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlasqlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlasqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});