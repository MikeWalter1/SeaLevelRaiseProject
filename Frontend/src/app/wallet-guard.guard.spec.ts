import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { walletGuardGuard } from './wallet-guard.guard';

describe('walletGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => walletGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
