import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PolicyApplication } from '../../services/policy-application';
import { Claim } from '../../services/claim';
import { Auth } from '../../services/auth';
import { ClaimsTable } from '../claims-table/claims-table';

@Component({
  selector: 'app-agent-dashboard',
  imports: [CommonModule, ClaimsTable],
  templateUrl: './agent-dashboard.html',
  styleUrl: './agent-dashboard.css'
})
export class AgentDashboard implements OnInit {
  customers: any[] = [];
  selectedCustomer: any = null;
  customerClaims: any[] = [];
  customerUploads: any[] = [];
  activeTab = 'applications';
  showDetailsModal = false;
  approvedCustomers: any[] = [];

  constructor(
    private policyApplicationService: PolicyApplication,
    private claimService: Claim,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'customers') {
      this.loadApprovedCustomers();
    }
  }

  loadApprovedCustomers() {
    this.approvedCustomers = this.customers.filter(c => c.status === 'Approved');
  }

  loadCustomers() {
    this.policyApplicationService.getAgentCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (error) => {
        this.customers = [];
      }
    });
  }

  viewDetails(customer: any) {
    this.selectedCustomer = customer;
    this.showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedCustomer = null;
  }

  loadCustomerDetails() {
  }

  downloadDocument(docType: string) {
    const token = localStorage.getItem('token');
    const url = `http://localhost:5001/api/policyapplications/${this.selectedCustomer.id}/documents/${docType}`;
    
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error('Document not found');
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${docType}_${this.selectedCustomer.user.name}`;
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      alert('Document not available');
    });
  }

  approveApplication(customer: any, status: string) {
    const approval = { status, comments: '' };
    this.policyApplicationService.approveApplication(customer.id, approval).subscribe(() => {
      this.loadCustomers();
    });
  }

  approveFromModal(status: string) {
    if (this.selectedCustomer) {
      const approval = { status, comments: '' };
      this.policyApplicationService.approveApplication(this.selectedCustomer.id, approval).subscribe(() => {
        this.loadCustomers();
        this.closeDetailsModal();
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
