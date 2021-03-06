/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FuseComponent } from './fuse.component';

describe('FuseComponent', () => {
  let component: FuseComponent;
  let fixture: ComponentFixture<FuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});