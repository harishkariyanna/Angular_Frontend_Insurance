import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyList } from '../policy-list/policy-list';
import { ClaimsTable } from '../claims-table/claims-table';
import { FileUpload } from '../file-upload/file-upload';
import { ApplicationsTable } from '../applications-table/applications-table';
import { AgentManagement } from '../agent-management/agent-management';
import { CustomerAssignmentComponent } from '../customer-assignment/customer-assignment';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, PolicyList, ClaimsTable, FileUpload, ApplicationsTable, AgentManagement, CustomerAssignmentComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  activeTab = 'policies';

  ngOnInit() {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}