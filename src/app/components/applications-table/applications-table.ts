import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PolicyApplication } from '../../services/policy-application';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-applications-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './applications-table.html',
  styleUrl: './applications-table.css'
})
export class ApplicationsTable implements OnInit {
  applications: any[] = [];
  agents: any[] = [];
  selectedApp: any = null;
  assigningApp: any = null;
  approvalStatus = '';
  adminComments = '';
  selectedAgentId: number | null = 0;

  constructor(
    private policyApplicationService: PolicyApplication,
    public authService: Auth
  ) {}

  ngOnInit() {
    this.loadApplications();
    if (this.authService.isAdmin()) {
      this.loadAgents();
    }
  }

  loadApplications() {
    this.policyApplicationService.getApplications().subscribe(apps => {
      this.applications = apps;
    });
  }

  openApprovalModal(app: any) {
    this.selectedApp = app;
    this.approvalStatus = app.status;
    this.adminComments = app.adminComments || '';
  }

  loadAgents() {
    this.policyApplicationService.getAgents().subscribe(agents => {
      this.agents = agents;
    });
  }

  openAssignModal(app: any) {
    this.assigningApp = app;
    this.selectedAgentId = 0;
  }

  assignAgent() {
    if (this.selectedAgentId && this.selectedAgentId > 0) {
      this.policyApplicationService.assignAgent(this.assigningApp.id, this.selectedAgentId).subscribe(() => {
        this.loadApplications();
        this.assigningApp = null;
        this.selectedAgentId = null;
      });
    }
  }

  approveApplication() {
    const approval = {
      status: this.approvalStatus,
      comments: this.adminComments
    };

    this.policyApplicationService.approveApplication(this.selectedApp.id, approval).subscribe(() => {
      this.loadApplications();
      this.selectedApp = null;
    });
  }
}
