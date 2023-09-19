import { TestBed } from '@angular/core/testing';

import { ProfileInterceptorInterceptor } from './profile-interceptor.interceptor';

describe('ProfileInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProfileInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProfileInterceptorInterceptor = TestBed.inject(ProfileInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
