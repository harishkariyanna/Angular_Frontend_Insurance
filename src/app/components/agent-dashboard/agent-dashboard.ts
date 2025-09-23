import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyApplication } from '../../services/policy-application';
import { Claim } from '../../services/claim';
import { FileUpload } from '../file-upload/file-upload';

@Component({
  selector: 'app-agent-dashboard',
  imports: [CommonModule, FileUpload],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.css'
})
export class AgentDashboard implements OnInit {
  customers: any[] = [];
  selectedCustomer: any = null;
  customerClaims: any[] = [];
  customerUploads: any[] = [];

  constructor(
    private policyApplicationService: PolicyApplication,
    private claimService: Claim
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.policyApplicationService.getAgentCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  selectCustomer(customer: any) {
    this.selectedCustomer = customer;
    this.loadCustomerDetails();
  }

  loadCustomerDetails() {
    // Load customer claims and uploads
  }

  approveApplication(status: string) {
    const approval = { status, comments: '' };
    this.policyApplicationService.approveApplication(this.selectedCustomer.id, approval).subscribe(() => {
      this.loadCustomers();
      this.selectedCustomer = null;
    });
  }
}
