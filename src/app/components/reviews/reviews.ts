import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from '../../services/review';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class Reviews implements OnInit {
  reviews: any[] = [];
  showAddForm = false;
  hoverRating = 0;
  newReview = {
    title: '',
    content: '',
    rating: 5
  };

  constructor(
    private reviewService: Review,
    public authService: Auth
  ) {}

  ngOnInit() {
    // Reviews are displayed on the main dashboard, not here
  }

  submitReview() {
    if (!this.newReview.title.trim() || !this.newReview.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (this.newReview.rating < 1 || this.newReview.rating > 5) {
      alert('Please select a valid rating');
      return;
    }

    console.log('Submitting review:', this.newReview);
    
    this.reviewService.createReview(this.newReview).subscribe({
      next: (response) => {
        console.log('Review submitted successfully:', response);
        alert('Review submitted successfully! It will be visible after admin approval.');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error submitting review:', error);
        alert('Error submitting review: ' + (error.error?.message || error.message || 'Unknown error'));
      }
    });
  }

  resetForm() {
    this.newReview = { title: '', content: '', rating: 5 };
    this.showAddForm = false;
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'fas fa-star' : 'far fa-star');
    }
    return stars;
  }

  setRating(rating: number) {
    console.log('Setting rating to:', rating);
    this.newReview.rating = rating;
    this.hoverRating = 0;
  }
}
