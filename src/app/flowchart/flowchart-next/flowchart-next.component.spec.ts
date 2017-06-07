/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {FlowchartNextComponent} from './flowchart-next.component'

xdescribe('FlowchartNextComponent', () => {
    let component: FlowchartNextComponent
    let fixture: ComponentFixture<FlowchartNextComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartNextComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartNextComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
