import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerAssignment as CustomerAssignmentService } from '../../services/customer-assignment';
import { AgentService } from '../../services/agent';

@Component({
  selector: 'app-customer-assignment',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-assignment.html',
  styleUrl: './customer-assignment.css'
})
export class CustomerAssignmentComponent implements OnInit {
  customers: any[] = [];
  agents: any[] = [];
  selectedAssignments: { [key: number]: number } = {};

  constructor(
    private customerService: CustomerAssignmentService,
    private agentService: AgentService
  ) {}

  ngOnInit() {
    this.loadCustomers();
    this.loadAgents();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe({
      next: (customers) => this.customers = customers,
      error: (error) => console.error('Error loading customers:', error)
    });
  }

  loadAgents() {
    this.agentService.getAgents().subscribe({
      next: (agents) => this.agents = agents,
      error: (error) => console.error('Error loading agents:', error)
    });
  }

  assignCustomer(customerId: number) {
    const agentId = this.selectedAssignments[customerId];
    if (!agentId) {
      alert('Please select an agent');
      return;
    }

    this.customerService.assignCustomerToAgent(customerId, agentId).subscribe({
      next: () => {
        alert('Customer assigned successfully');
        this.loadCustomers();
      },
      error: (error) => alert('Error assigning customer: ' + error.error.message)
    });
  }
}
