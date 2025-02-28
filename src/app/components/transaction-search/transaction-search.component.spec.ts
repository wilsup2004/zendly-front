import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSearchComponent } from './transaction-search.component';

describe('TransactionSearchComponent', () => {
  let component: TransactionSearchComponent;
  let fixture: ComponentFixture<TransactionSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionSearchComponent]
    });
    fixture = TestBed.createComponent(TransactionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
