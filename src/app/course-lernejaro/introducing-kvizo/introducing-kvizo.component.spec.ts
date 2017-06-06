import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroducingKvizoComponent } from './introducing-kvizo.component';

describe('IntroducingKvizoComponent', () => {
  let component: IntroducingKvizoComponent;
  let fixture: ComponentFixture<IntroducingKvizoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroducingKvizoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroducingKvizoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
