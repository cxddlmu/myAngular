/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SortableJSComponent } from './sortableJS.component';

describe('SortableJSComponent', () => {
  let component: SortableJSComponent;
  let fixture: ComponentFixture<SortableJSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortableJSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortableJSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});