import { TestBed } from '@angular/core/testing';

import { LayoutInterfaceInterceptor } from './layout-interface.interceptor';

describe('LayoutInterfaceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LayoutInterfaceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LayoutInterfaceInterceptor = TestBed.inject(LayoutInterfaceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
