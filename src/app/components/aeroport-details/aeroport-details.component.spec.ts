import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeroportDetailsComponent } from './aeroport-details.component';

describe('AeroportDetailsComponent', () => {
  let component: AeroportDetailsComponent;
  let fixture: ComponentFixture<AeroportDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeroportDetailsComponent]
    });
    fixture = TestBed.createComponent(AeroportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
