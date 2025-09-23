import { TestBed } from '@angular/core/testing';

import { PolicyApplication } from './policy-application';

describe('PolicyApplication', () => {
  let service: PolicyApplication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyApplication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
