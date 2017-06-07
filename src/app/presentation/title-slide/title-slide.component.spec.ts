/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { TitleSlideComponent } from './title-slide.component'

describe('TitleSlideComponent', () => {
  let component: TitleSlideComponent
  let fixture: ComponentFixture<TitleSlideComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleSlideComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleSlideComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
