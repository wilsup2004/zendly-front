import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionDetailComponent } from './proposition-detail.component';

describe('PropositionDetailComponent', () => {
  let component: PropositionDetailComponent;
  let fixture: ComponentFixture<PropositionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropositionDetailComponent]
    });
    fixture = TestBed.createComponent(PropositionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
