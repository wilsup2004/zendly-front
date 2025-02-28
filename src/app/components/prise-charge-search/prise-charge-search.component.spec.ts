import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriseChargeSearchComponent } from './prise-charge-search.component';

describe('PriseChargeSearchComponent', () => {
  let component: PriseChargeSearchComponent;
  let fixture: ComponentFixture<PriseChargeSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriseChargeSearchComponent]
    });
    fixture = TestBed.createComponent(PriseChargeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
