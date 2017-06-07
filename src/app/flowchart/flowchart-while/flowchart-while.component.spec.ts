/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing'
import {FlowchartWhileComponent} from './flowchart-while.component'

xdescribe('FlowchartWhileComponent', () => {
    let component: FlowchartWhileComponent
    let fixture: ComponentFixture<FlowchartWhileComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartWhileComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartWhileComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
