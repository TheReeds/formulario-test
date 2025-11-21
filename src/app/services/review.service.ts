import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Review {
    id?: number;
    productId: number;
    userId?: number;
    rating: number;
    comment: string;
    createdAt?: string;
    updatedAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ReviewService {
    private apiUrl = 'http://localhost:8080/api/reviews';

    constructor(private http: HttpClient) { }

    getProductReviews(productId: number): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.apiUrl}/product/${productId}`);
    }

    getUserReviews(): Observable<Review[]> {
        return this.http.get<Review[]>(`${this.apiUrl}/user`);
    }

    createReview(review: Review): Observable<Review> {
        return this.http.post<Review>(this.apiUrl, review);
    }

    updateReview(id: number, review: Review): Observable<Review> {
        return this.http.put<Review>(`${this.apiUrl}/${id}`, review);
    }

    deleteReview(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
