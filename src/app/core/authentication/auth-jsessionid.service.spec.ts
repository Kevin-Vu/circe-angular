import { TestBed } from '@angular/core/testing';

import { AuthJSessionIdService } from './auth-jsessionid.service';

describe('AuthJSessionIdService', () => {
  let service: AuthJSessionIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthJSessionIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
