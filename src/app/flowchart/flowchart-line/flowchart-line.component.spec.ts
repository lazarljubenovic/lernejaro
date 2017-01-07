/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlowchartLineComponent} from './flowchart-line.component';

xdescribe('FlowchartLineComponent', () => {
    let component: FlowchartLineComponent;
    let fixture: ComponentFixture<FlowchartLineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlowchartLineComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlowchartLineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
