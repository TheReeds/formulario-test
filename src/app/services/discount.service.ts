import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Discount {
    id?: number;
    code: string;
    percentage: number;
    fixedAmount?: number;
    startDate: string;
    endDate: string;
    active: boolean;
    description?: string;
    createdAt?: string;
}

@Injectable({
    providedIn: 'root'
})
export class DiscountService {
    private apiUrl = 'http://localhost:8080/api/discounts';

    constructor(private http: HttpClient) { }

    getAllDiscounts(): Observable<Discount[]> {
        return this.http.get<Discount[]>(this.apiUrl);
    }

    getActiveDiscounts(): Observable<Discount[]> {
        return this.http.get<Discount[]>(`${this.apiUrl}/active`);
    }

    getDiscountById(id: number): Observable<Discount> {
        return this.http.get<Discount>(`${this.apiUrl}/${id}`);
    }

    createDiscount(discount: Discount): Observable<Discount> {
        return this.http.post<Discount>(this.apiUrl, discount);
    }

    updateDiscount(id: number, discount: Discount): Observable<Discount> {
        return this.http.put<Discount>(`${this.apiUrl}/${id}`, discount);
    }

    deleteDiscount(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    validateDiscount(code: string): Observable<{ valid: boolean }> {
        return this.http.post<{ valid: boolean }>(`${this.apiUrl}/validate`, { code });
    }

    calculateDiscountedPrice(code: string, price: number): Observable<{ discountedPrice: number }> {
        return this.http.post<{ discountedPrice: number }>(`${this.apiUrl}/calculate`, { code, price });
    }
}
