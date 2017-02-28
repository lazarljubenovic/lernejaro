import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyItemDescriptionComponent } from './taxonomy-item-description.component';

describe('TaxonomyItemDescriptionComponent', () => {
  let component: TaxonomyItemDescriptionComponent;
  let fixture: ComponentFixture<TaxonomyItemDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonomyItemDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyItemDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
