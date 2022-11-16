import { TestBed } from '@angular/core/testing';

import { GuardAdminAuthService } from './guard-admin-auth.service';

describe('GuardAdminAuthService', () => {
  let service: GuardAdminAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardAdminAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
