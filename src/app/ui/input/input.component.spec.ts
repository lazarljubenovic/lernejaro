/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {InputComponent} from './input.component'

xdescribe('InputComponent', () => {
    let component: InputComponent
    let fixture: ComponentFixture<InputComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InputComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
