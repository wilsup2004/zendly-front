import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesComponent } from './finances.component';

describe('FinancesComponent', () => {
  let component: FinancesComponent;
  let fixture: ComponentFixture<FinancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancesComponent]
    });
    fixture = TestBed.createComponent(FinancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
