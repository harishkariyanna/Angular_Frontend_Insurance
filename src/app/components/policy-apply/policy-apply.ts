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
  aadharFile: File | null = null;
  panFile: File | null = null;
  passbookFile: File | null = null;
  
  constructor(private policyApplicationService: PolicyApplication) {}
  
  openModal(policy: any) {
    this.policy = policy;
    this.showModal = true;
    this.resetFiles();
  }
  
  closeModal() {
    this.showModal = false;
    this.policy = null;
    this.resetFiles();
  }

  resetFiles() {
    this.aadharFile = null;
    this.panFile = null;
    this.passbookFile = null;
  }

  onFileSelect(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      switch(type) {
        case 'aadhar': this.aadharFile = file; break;
        case 'pan': this.panFile = file; break;
        case 'passbook': this.passbookFile = file; break;
      }
    }
  }

  isFormValid(): boolean {
    return !!(this.aadharFile && this.panFile && this.passbookFile);
  }
  
  applyForPolicy() {
    if (!this.isFormValid()) return;

    const formData = new FormData();
    formData.append('PolicyId', this.policy.id.toString());
    formData.append('DurationMonths', this.durationMonths.toString());
    formData.append('AadharCard', this.aadharFile!);
    formData.append('PanCard', this.panFile!);
    formData.append('BankPassbook', this.passbookFile!);
    
    this.policyApplicationService.createApplicationWithDocuments(formData).subscribe(() => {
      this.applied.emit();
      this.closeModal();
    });
  }
}
