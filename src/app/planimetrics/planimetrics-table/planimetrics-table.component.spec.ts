/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PlanimetricsTableComponent} from './planimetrics-table.component';

xdescribe('PlanimetricsTableComponent', () => {
    let component: PlanimetricsTableComponent;
    let fixture: ComponentFixture<PlanimetricsTableComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlanimetricsTableComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlanimetricsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
