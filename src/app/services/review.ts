import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Review {
  private apiUrl = 'http://localhost:5001/api/reviews';

  constructor(private http: HttpClient) { }

  getApprovedReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPendingReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pending`);
  }

  createReview(review: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, review);
  }

  approveReview(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/approve`, {});
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getApprovedReviewsForAdmin(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/approved`);
  }

  toggleVisibility(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/toggle-visibility`, {});
  }
}
