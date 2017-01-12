/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlanimetricsControlCircleComponent } from './planimetrics-control-circle.component';

describe('PlanimetricsControlCircleComponent', () => {
  let component: PlanimetricsControlCircleComponent;
  let fixture: ComponentFixture<PlanimetricsControlCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanimetricsControlCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanimetricsControlCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
