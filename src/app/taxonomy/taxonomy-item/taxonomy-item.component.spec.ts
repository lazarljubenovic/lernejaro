import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyItemComponent } from './taxonomy-item.component';

describe('TaxonomyItemComponent', () => {
  let component: TaxonomyItemComponent;
  let fixture: ComponentFixture<TaxonomyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonomyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
