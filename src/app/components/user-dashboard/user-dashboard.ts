import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PolicyList } from '../policy-list/policy-list';
import { ClaimsTable } from '../claims-table/claims-table';
import { ApplicationsTable } from '../applications-table/applications-table';
import { CustomerProfile } from '../customer-profile/customer-profile';
import { Reviews } from '../reviews/reviews';
import { Footer } from '../footer/footer';
import { Auth } from '../../services/auth';
import { Review } from '../../services/review';

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, RouterModule, PolicyList, ClaimsTable, ApplicationsTable, CustomerProfile, Reviews, Footer],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard implements OnInit {
  activeTab = 'policies';
  customerReviews: any[] = [];

  constructor(private auth: Auth, private router: Router, private reviewService: Review) {}

  ngOnInit() {
    this.loadCustomerReviews();
  }

  loadCustomerReviews() {
    this.reviewService.getApprovedReviews().subscribe({
      next: (reviews) => {
        this.customerReviews = reviews;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
      }
    });
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'fas fa-star' : 'far fa-star');
    }
    return stars;
  }

  getReviewGroups(): any[][] {
    const groups = [];
    for (let i = 0; i < this.customerReviews.length; i += 3) {
      groups.push(this.customerReviews.slice(i, i + 3));
    }
    return groups;
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}