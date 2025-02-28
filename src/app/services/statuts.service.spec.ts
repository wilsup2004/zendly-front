import { TestBed } from '@angular/core/testing';

import { StatutsService } from './statuts.service';

describe('StatutsService', () => {
  let service: StatutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
