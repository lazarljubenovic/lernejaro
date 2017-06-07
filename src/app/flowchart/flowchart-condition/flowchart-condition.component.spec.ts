/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {FlowchartConditionComponent} from './flowchart-condition.component'

xdescribe('FlowchartConditionComponent', () => {
    let component: FlowchartConditionComponent
    let fixture: ComponentFixture<FlowchartConditionComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartConditionComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartConditionComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
