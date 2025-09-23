import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Policy {
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getPolicies(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/policies`);
  }

  getPolicy(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/policies/${id}`);
  }

  createPolicy(policy: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/policies`, policy, { headers: this.getHeaders() });
  }

  updatePolicy(id: number, policy: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/policies/${id}`, policy, { headers: this.getHeaders() });
  }

  deletePolicy(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/policies/${id}`, { headers: this.getHeaders() });
  }
}
