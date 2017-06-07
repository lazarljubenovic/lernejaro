/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {FlowchartThenComponent} from './flowchart-then.component'

xdescribe('FlowchartThenComponent', () => {
    let component: FlowchartThenComponent
    let fixture: ComponentFixture<FlowchartThenComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartThenComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartThenComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
