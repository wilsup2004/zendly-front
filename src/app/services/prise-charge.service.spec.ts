import { TestBed } from '@angular/core/testing';

import { PriseChargeService } from './prise-charge.service';

describe('PriseChargeService', () => {
  let service: PriseChargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriseChargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
