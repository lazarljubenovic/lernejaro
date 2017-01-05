/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BitmapComponent } from './bitmap.component';

describe('BitmapComponent', () => {
  let component: BitmapComponent;
  let fixture: ComponentFixture<BitmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
