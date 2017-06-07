/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {PlanimetricsControlComponent} from './planimetrics-control.component'

xdescribe('PlanimetricsControlComponent', () => {
    let component: PlanimetricsControlComponent
    let fixture: ComponentFixture<PlanimetricsControlComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlanimetricsControlComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(PlanimetricsControlComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
