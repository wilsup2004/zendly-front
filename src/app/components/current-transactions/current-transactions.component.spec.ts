import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTransactionsComponent } from './current-transactions.component';

describe('CurrentTransactionsComponent', () => {
  let component: CurrentTransactionsComponent;
  let fixture: ComponentFixture<CurrentTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentTransactionsComponent]
    });
    fixture = TestBed.createComponent(CurrentTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
