import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicyApplication {
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/policyapplications`, { headers: this.getHeaders() });
  }

  createApplication(application: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/policyapplications`, application, { headers: this.getHeaders() });
  }

  createApplicationWithDocuments(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/policyapplications`, formData, { headers: this.getAuthHeaders() });
  }

  approveApplication(id: number, approval: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/policyapplications/${id}/approve`, approval, { headers: this.getHeaders() });
  }

  assignAgent(id: number, agentId: number): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/policyapplications/${id}/assign-agent`, { agentId }, { headers: this.getHeaders() });
  }

  getAgentCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/policyapplications/agent-customers`, { headers: this.getHeaders() });
  }

  getAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/policyapplications/agents`, { headers: this.getHeaders() });
  }
}
