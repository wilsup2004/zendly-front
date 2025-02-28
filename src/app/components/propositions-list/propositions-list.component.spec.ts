import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionsListComponent } from './propositions-list.component';

describe('PropositionsListComponent', () => {
  let component: PropositionsListComponent;
  let fixture: ComponentFixture<PropositionsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropositionsListComponent]
    });
    fixture = TestBed.createComponent(PropositionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
