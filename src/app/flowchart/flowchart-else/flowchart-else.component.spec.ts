/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {FlowchartElseComponent} from './flowchart-else.component'

xdescribe('FlowchartElseComponent', () => {
    let component: FlowchartElseComponent
    let fixture: ComponentFixture<FlowchartElseComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartElseComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartElseComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
