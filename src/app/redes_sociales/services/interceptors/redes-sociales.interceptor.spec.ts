import { TestBed } from '@angular/core/testing';

import { RedesSocialesInterceptor } from './redes-sociales.interceptor';

describe('RedesSocialesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RedesSocialesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RedesSocialesInterceptor = TestBed.inject(RedesSocialesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
