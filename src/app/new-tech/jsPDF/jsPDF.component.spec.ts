/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsPDFComponent } from './jsPDF.component';

describe('JsPDFComponent', () => {
  let component: JsPDFComponent;
  let fixture: ComponentFixture<JsPDFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsPDFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});