import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerAssignment {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/customerassignment/customers`);
  }

  assignCustomerToAgent(customerId: number, agentId: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/customerassignment/assign`, {
      customerId,
      agentId
    });
  }
}
