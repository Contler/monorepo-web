import { TestBed } from '@angular/core/testing';

import { WakeService } from './wake.service';

describe('WakeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WakeService = TestBed.get(WakeService);
    expect(service).toBeTruthy();
  });
});
