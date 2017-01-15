/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StereometricsComponent } from './stereometrics.component';

describe('StereometricsComponent', () => {
  let component: StereometricsComponent;
  let fixture: ComponentFixture<StereometricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StereometricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StereometricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
