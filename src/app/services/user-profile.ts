import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfile {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/userprofile`);
  }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/userprofile/${userId}`);
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/userprofile`, profile);
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.apiUrl}/userprofile/upload-picture`, formData);
  }

  getProfilePictureUrl(userId: number): string {
    return `${environment.apiUrl}/userprofile/picture/${userId}`;
  }
}