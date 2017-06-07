/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { KatexComponent } from './katex.component'

describe('KatexComponent', () => {
  let component: KatexComponent
  let fixture: ComponentFixture<KatexComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KatexComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(KatexComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
