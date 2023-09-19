import { TestBed } from '@angular/core/testing';

import { BilleteraInterceptorInterceptor } from './billetera-interceptor.interceptor';

describe('BilleteraInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BilleteraInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BilleteraInterceptorInterceptor = TestBed.inject(BilleteraInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
