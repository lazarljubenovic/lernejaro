/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ObjectRowComponent} from './object-row.component';

xdescribe('ObjectRowComponent', () => {
    let component: ObjectRowComponent;
    let fixture: ComponentFixture<ObjectRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ObjectRowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
