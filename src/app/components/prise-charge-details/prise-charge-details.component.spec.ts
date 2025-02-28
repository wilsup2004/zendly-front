import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriseChargeDetailsComponent } from './prise-charge-details.component';

describe('PriseChargeDetailsComponent', () => {
  let component: PriseChargeDetailsComponent;
  let fixture: ComponentFixture<PriseChargeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriseChargeDetailsComponent]
    });
    fixture = TestBed.createComponent(PriseChargeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
