import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriseChargeListComponent } from './prise-charge-list.component';

describe('PriseChargeListComponent', () => {
  let component: PriseChargeListComponent;
  let fixture: ComponentFixture<PriseChargeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriseChargeListComponent]
    });
    fixture = TestBed.createComponent(PriseChargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
