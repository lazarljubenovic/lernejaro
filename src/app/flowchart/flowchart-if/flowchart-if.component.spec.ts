/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlowchartIfComponent} from './flowchart-if.component';

xdescribe('FlowchartIfComponent', () => {
    let component: FlowchartIfComponent;
    let fixture: ComponentFixture<FlowchartIfComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartIfComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartIfComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
