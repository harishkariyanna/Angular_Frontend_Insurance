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
  @Input() showApplyButton = true;
  @ViewChild(PolicyApply) policyApply!: PolicyApply;
  policies: any[] = [];
  showAddForm = false;
  showEditForm = false;
  newPolicy = { name: '', description: '', premium: 0 };
  editingPolicy: any = null;

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

  editPolicy(policy: any) {
    this.editingPolicy = { ...policy };
    this.showEditForm = true;
    this.showAddForm = false;
  }

  updatePolicy() {
    this.policyService.updatePolicy(this.editingPolicy.id, this.editingPolicy).subscribe(() => {
      this.loadPolicies();
      this.showEditForm = false;
      this.editingPolicy = null;
    });
  }

  cancelEdit() {
    this.showEditForm = false;
    this.editingPolicy = null;
  }

  applyForPolicy(policy: any) {
    this.policyApply.openModal(policy);
  }

  onApplicationSubmitted() {
    // Refresh or show success message
    alert('Application submitted successfully!');
  }
}