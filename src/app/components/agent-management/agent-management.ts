import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../../services/agent';

@Component({
  selector: 'app-agent-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-management.html',
  styleUrl: './agent-management.css'
})
export class AgentManagement implements OnInit {
  agents: any[] = [];
  showAddForm = false;
  editingAgent: any = null;
  
  newAgent = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private agentService: AgentService) {}

  ngOnInit() {
    this.loadAgents();
  }

  loadAgents() {
    this.agentService.getAgents().subscribe({
      next: (agents) => {
        console.log('Loaded agents:', agents);
        this.agents = agents;
      },
      error: (error) => {
        console.error('Error loading agents:', error);
        alert('Error loading agents: ' + (error.error?.message || error.message || 'Unknown error'));
      }
    });
  }

  addAgent() {
    if (!this.newAgent.name || !this.newAgent.email || !this.newAgent.password) {
      alert('Please fill in all fields');
      return;
    }
    
    this.agentService.createAgent(this.newAgent).subscribe({
      next: () => {
        this.loadAgents();
        this.resetForm();
        alert('Agent created successfully');
      },
      error: (error) => {
        console.error('Error creating agent:', error);
        alert('Error creating agent: ' + (error.error?.message || error.message || 'Unknown error'));
      }
    });
  }

  editAgent(agent: any) {
    this.editingAgent = { ...agent };
  }

  updateAgent() {
    this.agentService.updateAgent(this.editingAgent.id, {
      name: this.editingAgent.name,
      email: this.editingAgent.email
    }).subscribe({
      next: () => {
        this.loadAgents();
        this.editingAgent = null;
        alert('Agent updated successfully');
      },
      error: (error) => alert('Error updating agent: ' + error.error.message)
    });
  }

  deleteAgent(id: number) {
    if (confirm('Are you sure you want to delete this agent?')) {
      this.agentService.deleteAgent(id).subscribe({
        next: () => {
          this.loadAgents();
          alert('Agent deleted successfully');
        },
        error: (error) => alert('Error deleting agent: ' + error.error.message)
      });
    }
  }

  resetForm() {
    this.newAgent = { name: '', email: '', password: '' };
    this.showAddForm = false;
  }

  cancelEdit() {
    this.editingAgent = null;
  }

  formatToIST(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }
}
