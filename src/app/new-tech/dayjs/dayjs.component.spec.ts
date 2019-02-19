/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DayjsComponent } from './dayjs.component';

describe('DayjsComponent', () => {
  let component: DayjsComponent;
  let fixture: ComponentFixture<DayjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});