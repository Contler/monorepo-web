import { TestBed } from '@angular/core/testing';

import { GuestHomeCanDeactivateGuard } from './guest-home-can-deactivate.guard';

describe('GuestHomeCanDeactivateGuard', () => {
  let guard: GuestHomeCanDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuestHomeCanDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
