import { TestBed } from '@angular/core/testing';

import { FriendsInterceptorInterceptor } from './friends-interceptor.interceptor';

describe('FriendsInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FriendsInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FriendsInterceptorInterceptor = TestBed.inject(FriendsInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
