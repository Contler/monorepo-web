import { TestBed } from '@angular/core/testing';

import { CheckOrdersService } from './check-orders.service';

describe('CheckOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckOrdersService = TestBed.get(CheckOrdersService);
    expect(service).toBeTruthy();
  });
});
