import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../services/review';

@Component({
  selector: 'app-review-management',
  imports: [CommonModule],
  templateUrl: './review-management.html',
  styleUrl: './review-management.css'
})
export class ReviewManagement implements OnInit {
  pendingReviews: any[] = [];
  approvedReviews: any[] = [];
  activeTab = 'pending';

  constructor(private reviewService: Review) {}

  ngOnInit() {
    this.loadPendingReviews();
    this.loadApprovedReviews();
  }

  loadPendingReviews() {
    this.reviewService.getPendingReviews().subscribe(reviews => {
      this.pendingReviews = reviews;
    });
  }

  loadApprovedReviews() {
    this.reviewService.getApprovedReviewsForAdmin().subscribe(reviews => {
      this.approvedReviews = reviews;
    });
  }

  approveReview(id: number) {
    this.reviewService.approveReview(id).subscribe(() => {
      this.loadPendingReviews();
      alert('Review approved successfully!');
    });
  }

  deleteReview(id: number) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(id).subscribe(() => {
        this.loadPendingReviews();
        this.loadApprovedReviews();
        alert('Review deleted successfully!');
      });
    }
  }

  toggleVisibility(id: number) {
    this.reviewService.toggleVisibility(id).subscribe(() => {
      this.loadApprovedReviews();
      alert('Review visibility updated!');
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'fas fa-star' : 'far fa-star');
    }
    return stars;
  }
}
