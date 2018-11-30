/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IronDBComponent } from './IronDB.component';

describe('IronDBComponent', () => {
  let component: IronDBComponent;
  let fixture: ComponentFixture<IronDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IronDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IronDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
