import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PolicyApplication } from '../../services/policy-application';
import { Claim } from '../../services/claim';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-agent-dashboard',
  imports: [CommonModule],
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
    private claimService: Claim,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCustomers();
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

  selectCustomer(customer: any) {
    this.selectedCustomer = customer;
    this.loadCustomerDetails();
  }

  loadCustomerDetails() {
    // Load customer claims and uploads
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

  approveApplication(status: string) {
    const approval = { status, comments: '' };
    this.policyApplicationService.approveApplication(this.selectedCustomer.id, approval).subscribe(() => {
      this.loadCustomers();
      this.selectedCustomer = null;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
