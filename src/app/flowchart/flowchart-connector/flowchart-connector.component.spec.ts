/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {FlowchartConnectorComponent} from './flowchart-connector.component'

xdescribe('FlowchartConnectorComponent', () => {
    let component: FlowchartConnectorComponent
    let fixture: ComponentFixture<FlowchartConnectorComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartConnectorComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartConnectorComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
