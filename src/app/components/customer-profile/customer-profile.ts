import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../../services/user-profile';

@Component({
  selector: 'app-customer-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.css'
})
export class CustomerProfile implements OnInit {
  profile: any = {};
  editMode = false;
  selectedFile: File | null = null;
  profilePictureUrl = '';

  constructor(private userProfileService: UserProfile) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.userProfileService.getProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.updateProfilePictureUrl();
      },
      error: (error) => console.error('Error loading profile:', error)
    });
  }

  updateProfilePictureUrl() {
    if (this.profile.id) {
      this.profilePictureUrl = this.userProfileService.getProfilePictureUrl(this.profile.id) + '?t=' + Date.now();
    } else {
      this.profilePictureUrl = 'https://via.placeholder.com/150x150/cccccc/666666?text=No+Image';
    }
  }

  onImageError() {
    this.profilePictureUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProfile() {
    this.userProfileService.updateProfile(this.profile).subscribe({
      next: () => {
        this.editMode = false;
        this.loadProfile();
      },
      error: (error) => console.error('Error updating profile:', error)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.uploadProfilePicture();
    }
  }

  uploadProfilePicture() {
    if (this.selectedFile) {
      this.userProfileService.uploadProfilePicture(this.selectedFile).subscribe({
        next: (response) => {
          this.updateProfilePictureUrl();
          this.selectedFile = null;
        },
        error: (error) => console.error('Error uploading picture:', error)
      });
    }
  }

  downloadProfile() {
    const profileData = {
      name: this.profile.name,
      email: this.profile.email,
      phone: this.profile.phone,
      address: this.profile.address,
      dateOfBirth: this.profile.dateOfBirth,
      gender: this.profile.gender,
      occupation: this.profile.occupation
    };
    
    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.profile.name}_profile.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
