import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Claim {
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getClaims(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/claims`, { headers: this.getHeaders() });
  }

  getClaim(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/claims/${id}`, { headers: this.getHeaders() });
  }

  createClaim(claim: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/claims`, claim, { headers: this.getHeaders() });
  }

  getUserApprovedPolicies(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/claims/user-approved-policies`, { headers: this.getHeaders() });
  }

  approveClaim(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/claims/${id}/approve`, { status }, { headers: this.getHeaders() });
  }

  updateClaim(id: number, claim: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/claims/${id}`, claim, { headers: this.getHeaders() });
  }

  deleteClaim(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/claims/${id}`, { headers: this.getHeaders() });
  }
}
