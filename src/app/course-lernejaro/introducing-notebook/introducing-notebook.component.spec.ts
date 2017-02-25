import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IntroducingNotebookComponent} from './introducing-notebook.component';

xdescribe('IntroducingNotebookComponent', () => {
    let component: IntroducingNotebookComponent;
    let fixture: ComponentFixture<IntroducingNotebookComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IntroducingNotebookComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IntroducingNotebookComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
