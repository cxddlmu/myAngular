/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnimejsComponent } from './animejs.component';

describe('AnimejsComponent', () => {
  let component: AnimejsComponent;
  let fixture: ComponentFixture<AnimejsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimejsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimejsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});