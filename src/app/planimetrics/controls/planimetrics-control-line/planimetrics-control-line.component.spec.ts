/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlanimetricsControlLineComponent } from './planimetrics-control-line.component';

describe('PlanimetricsControlLineComponent', () => {
  let component: PlanimetricsControlLineComponent;
  let fixture: ComponentFixture<PlanimetricsControlLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanimetricsControlLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanimetricsControlLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
