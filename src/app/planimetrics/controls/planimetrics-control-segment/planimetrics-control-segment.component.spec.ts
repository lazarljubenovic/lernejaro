/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlanimetricsControlSegmentComponent } from './planimetrics-control-segment.component';

describe('PlanimetricsControlSegmentComponent', () => {
  let component: PlanimetricsControlSegmentComponent;
  let fixture: ComponentFixture<PlanimetricsControlSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanimetricsControlSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanimetricsControlSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
