import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PolicyApplication } from '../../services/policy-application';

@Component({
  selector: 'app-policy-apply',
  imports: [CommonModule, FormsModule],
  templateUrl: './policy-apply.html',
  styleUrl: './policy-apply.css'
})
export class PolicyApply {
  @Input() policy: any = null;
  @Output() applied = new EventEmitter<void>();
  
  showModal = false;
  durationMonths = 12;
  
  constructor(private policyApplicationService: PolicyApplication) {}
  
  openModal(policy: any) {
    this.policy = policy;
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
    this.policy = null;
  }
  
  applyForPolicy() {
    const application = {
      policyId: this.policy.id,
      durationMonths: this.durationMonths
    };
    
    this.policyApplicationService.createApplication(application).subscribe(() => {
      this.applied.emit();
      this.closeModal();
    });
  }
}
