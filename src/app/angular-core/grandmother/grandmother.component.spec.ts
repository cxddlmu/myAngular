/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GrandmotherComponent } from './grandmother.component';

describe('GrandmotherComponent', () => {
  let component: GrandmotherComponent;
  let fixture: ComponentFixture<GrandmotherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandmotherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandmotherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
