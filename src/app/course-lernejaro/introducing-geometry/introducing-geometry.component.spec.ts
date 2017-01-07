/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IntroducingGeometryComponent} from './introducing-geometry.component';

xdescribe('IntroducingGeometryComponent', () => {
    let component: IntroducingGeometryComponent;
    let fixture: ComponentFixture<IntroducingGeometryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IntroducingGeometryComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IntroducingGeometryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
