/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlowchartArrowComponent} from './flowchart-arrow.component';

xdescribe('FlowchartArrowComponent', () => {
    let component: FlowchartArrowComponent;
    let fixture: ComponentFixture<FlowchartArrowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartArrowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartArrowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
