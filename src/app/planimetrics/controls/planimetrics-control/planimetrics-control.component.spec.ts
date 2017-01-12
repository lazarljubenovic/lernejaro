/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlanimetricsControlComponent } from './planimetrics-control.component';

describe('PlanimetricsControlComponent', () => {
  let component: PlanimetricsControlComponent;
  let fixture: ComponentFixture<PlanimetricsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanimetricsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanimetricsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
