/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GliderComponent } from './glider.component';

describe('GliderComponent', () => {
  let component: GliderComponent;
  let fixture: ComponentFixture<GliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});