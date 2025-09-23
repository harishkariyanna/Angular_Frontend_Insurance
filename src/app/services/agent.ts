import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  constructor(private http: HttpClient) {}



  getAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/agents`);
  }

  createAgent(agent: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/agents`, agent);
  }

  updateAgent(id: number, agent: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/agents/${id}`, agent);
  }

  deleteAgent(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/agents/${id}`);
  }
}