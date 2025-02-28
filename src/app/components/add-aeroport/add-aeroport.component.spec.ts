import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAeroportComponent } from './add-aeroport.component';

describe('AddAeroportComponent', () => {
  let component: AddAeroportComponent;
  let fixture: ComponentFixture<AddAeroportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAeroportComponent]
    });
    fixture = TestBed.createComponent(AddAeroportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
