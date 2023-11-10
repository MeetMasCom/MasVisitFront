import { TestBed } from '@angular/core/testing';

import { PostInterceptorsInterceptor } from './post-interceptors.interceptor';

describe('PostInterceptorsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostInterceptorsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PostInterceptorsInterceptor = TestBed.inject(PostInterceptorsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
