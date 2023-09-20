import { TestBed } from '@angular/core/testing';

import { SharedInterceptorInterceptor } from './shared-interceptor.interceptor';

describe('SharedInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SharedInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SharedInterceptorInterceptor = TestBed.inject(SharedInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
