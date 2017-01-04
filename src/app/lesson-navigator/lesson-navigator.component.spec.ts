/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LessonNavigatorComponent } from './lesson-navigator.component';

describe('LessonNavigatorComponent', () => {
  let component: LessonNavigatorComponent;
  let fixture: ComponentFixture<LessonNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
