import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeroportListComponent } from './aeroport-list.component';

describe('AeroportListComponent', () => {
  let component: AeroportListComponent;
  let fixture: ComponentFixture<AeroportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeroportListComponent]
    });
    fixture = TestBed.createComponent(AeroportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
