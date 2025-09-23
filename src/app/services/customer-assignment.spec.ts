import { TestBed } from '@angular/core/testing';

import { CustomerAssignment } from './customer-assignment';

describe('CustomerAssignment', () => {
  let service: CustomerAssignment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAssignment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
