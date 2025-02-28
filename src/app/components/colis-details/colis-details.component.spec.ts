import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisDetailsComponent } from './colis-details.component';

describe('ColisDetailsComponent', () => {
  let component: ColisDetailsComponent;
  let fixture: ComponentFixture<ColisDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColisDetailsComponent]
    });
    fixture = TestBed.createComponent(ColisDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
