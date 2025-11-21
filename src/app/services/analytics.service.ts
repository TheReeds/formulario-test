import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.service';

export interface AnalyticsSummary {
    totalProducts: number;
    activeProducts: number;
    lowStockCount: number;
    averageRating: number;
    totalReviews: number;
}

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    private apiUrl = 'http://localhost:8080/api/analytics';

    constructor(private http: HttpClient) { }

    getSummary(): Observable<AnalyticsSummary> {
        return this.http.get<AnalyticsSummary>(`${this.apiUrl}/summary`);
    }

    getTopRatedProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/top-rated`);
    }

    getLowStockProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/low-stock`);
    }
}
