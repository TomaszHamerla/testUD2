import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { clientFormDeactivateGuardGuard } from './client-form-deactivate-guard.guard';

describe('clientFormDeactivateGuardGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clientFormDeactivateGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
