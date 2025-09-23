import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyApply } from './policy-apply';

describe('PolicyApply', () => {
  let component: PolicyApply;
  let fixture: ComponentFixture<PolicyApply>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyApply]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyApply);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
