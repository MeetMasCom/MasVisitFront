import { TestBed } from '@angular/core/testing';

import { BilleteraServiceService } from './billetera-service.service';

describe('BilleteraServiceService', () => {
  let service: BilleteraServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilleteraServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
