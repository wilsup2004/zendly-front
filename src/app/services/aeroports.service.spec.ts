import { TestBed } from '@angular/core/testing';

import { AeroportsService } from './aeroports.service';

describe('AeroportsService', () => {
  let service: AeroportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AeroportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
