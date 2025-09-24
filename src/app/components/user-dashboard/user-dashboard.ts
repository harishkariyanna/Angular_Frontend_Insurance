import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PolicyList } from '../policy-list/policy-list';
import { ClaimsTable } from '../claims-table/claims-table';

import { ApplicationsTable } from '../applications-table/applications-table';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, PolicyList, ClaimsTable, ApplicationsTable],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard implements OnInit {
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