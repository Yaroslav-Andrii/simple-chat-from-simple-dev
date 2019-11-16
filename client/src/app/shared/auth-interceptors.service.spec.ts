import { TestBed } from '@angular/core/testing';

import { AuthInterceptors } from './auth-interceptors.service';

describe('AuthInterceptorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthInterceptors = TestBed.get(AuthInterceptors);
    expect(service).toBeTruthy();
  });
});
