/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {LessonCardComponent} from './lesson-card.component'

xdescribe('LessonCardComponent', () => {
    let component: LessonCardComponent
    let fixture: ComponentFixture<LessonCardComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LessonCardComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LessonCardComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
