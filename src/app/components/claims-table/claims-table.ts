import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Claim } from '../../services/claim';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-claims-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './claims-table.html',
  styleUrl: './claims-table.css'
})
export class ClaimsTable implements OnInit {
  claims: any[] = [];
  approvedPolicies: any[] = [];
  showAddForm = false;
  selectedClaim: any = null;
  newClaim = { title: '', description: '', amount: 0, policyApplicationId: 0 };
  filterStatus = '';

  constructor(private claimService: Claim, public authService: Auth) {}

  ngOnInit() {
    this.loadClaims();
    if (!this.authService.isAdmin()) {
      this.loadApprovedPolicies();
    }
  }

  loadClaims() {
    this.claimService.getClaims().subscribe(claims => {
      this.claims = claims;
    });
  }

  loadApprovedPolicies() {
    this.claimService.getUserApprovedPolicies().subscribe(policies => {
      this.approvedPolicies = policies;
    });
  }

  addClaim() {
    this.claimService.createClaim(this.newClaim).subscribe(() => {
      this.loadClaims();
      this.showAddForm = false;
      this.newClaim = { title: '', description: '', amount: 0, policyApplicationId: 0 };
    });
  }

  openApprovalModal(claim: any) {
    this.selectedClaim = claim;
  }

  approveClaim(status: string) {
    this.claimService.approveClaim(this.selectedClaim.id, status).subscribe(() => {
      this.loadClaims();
      this.selectedClaim = null;
    });
  }

  get filteredClaims() {
    return this.filterStatus ? 
      this.claims.filter(claim => claim.status === this.filterStatus) : 
      this.claims;
  }
}