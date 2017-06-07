/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {FlowchartRepeatComponent} from './flowchart-repeat.component'

xdescribe('FlowchartRepeatComponent', () => {
    let component: FlowchartRepeatComponent
    let fixture: ComponentFixture<FlowchartRepeatComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartRepeatComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartRepeatComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
