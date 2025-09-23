import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAssignment } from './customer-assignment';

describe('CustomerAssignment', () => {
  let component: CustomerAssignment;
  let fixture: ComponentFixture<CustomerAssignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerAssignment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAssignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
