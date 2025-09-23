import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Policy } from '../../services/policy';
import { PolicyApply } from '../policy-apply/policy-apply';

@Component({
  selector: 'app-policy-list',
  imports: [CommonModule, FormsModule, PolicyApply],
  templateUrl: './policy-list.html',
  styleUrl: './policy-list.css'
})
export class PolicyList implements OnInit {
  @Input() isAdmin = false;
  @ViewChild(PolicyApply) policyApply!: PolicyApply;
  policies: any[] = [];
  showAddForm = false;
  newPolicy = { name: '', description: '', premium: 0 };

  constructor(private policyService: Policy) {}

  ngOnInit() {
    this.loadPolicies();
  }

  loadPolicies() {
    this.policyService.getPolicies().subscribe(policies => {
      this.policies = policies;
    });
  }

  addPolicy() {
    this.policyService.createPolicy(this.newPolicy).subscribe(() => {
      this.loadPolicies();
      this.showAddForm = false;
      this.newPolicy = { name: '', description: '', premium: 0 };
    });
  }

  deletePolicy(id: number) {
    if (confirm('Are you sure?')) {
      this.policyService.deletePolicy(id).subscribe(() => {
        this.loadPolicies();
      });
    }
  }

  applyForPolicy(policy: any) {
    this.policyApply.openModal(policy);
  }

  onApplicationSubmitted() {
    // Refresh or show success message
    alert('Application submitted successfully!');
  }
}