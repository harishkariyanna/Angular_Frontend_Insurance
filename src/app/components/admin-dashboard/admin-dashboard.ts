import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyList } from '../policy-list/policy-list';

import { ApplicationsTable } from '../applications-table/applications-table';
import { AgentManagement } from '../agent-management/agent-management';
import { CustomerAssignmentComponent } from '../customer-assignment/customer-assignment';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, PolicyList, ApplicationsTable, AgentManagement, CustomerAssignmentComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  activeTab = 'policies';

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}