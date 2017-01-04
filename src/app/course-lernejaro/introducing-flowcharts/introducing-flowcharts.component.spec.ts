/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IntroducingFlowchartsComponent } from './introducing-flowcharts.component';

describe('IntroducingFlowchartsComponent', () => {
  let component: IntroducingFlowchartsComponent;
  let fixture: ComponentFixture<IntroducingFlowchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroducingFlowchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroducingFlowchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
