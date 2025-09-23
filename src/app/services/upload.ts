import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Upload {
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUploads(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/uploads`, { headers: this.getHeaders() });
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.apiUrl}/uploads`, formData, { headers: this.getHeaders() });
  }

  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/uploads/download/${id}`, {
      headers: this.getHeaders(),
      responseType: 'blob'
    });
  }

  deleteUpload(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/uploads/${id}`, { headers: this.getHeaders() });
  }
}
