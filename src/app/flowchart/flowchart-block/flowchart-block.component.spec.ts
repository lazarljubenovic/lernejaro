/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {FlowchartBlockComponent} from './flowchart-block.component'

xdescribe('FlowchartBlockComponent', () => {
    let component: FlowchartBlockComponent
    let fixture: ComponentFixture<FlowchartBlockComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartBlockComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartBlockComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
