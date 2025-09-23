import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyList } from '../policy-list/policy-list';
import { ClaimsTable } from '../claims-table/claims-table';
import { FileUpload } from '../file-upload/file-upload';
import { ApplicationsTable } from '../applications-table/applications-table';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, PolicyList, ClaimsTable, FileUpload, ApplicationsTable],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard implements OnInit {
  activeTab = 'policies';

  ngOnInit() {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}