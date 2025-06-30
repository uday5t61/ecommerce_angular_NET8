import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { Observable } from 'rxjs';
import { ShopParams } from '../../shared/models/ShopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'http://localhost:5001/api';
  types: string[] = [];
  brands: string[] = [];
  private httpClient = inject(HttpClient);

  getProducts(shopParams: ShopParams): Observable<Pagination<Product>> {
    let params = new HttpParams();
    if (shopParams.brands && shopParams.brands.length > 0) {
      params = params.append('brands', shopParams.brands.join(','));
    }
    if (shopParams.types && shopParams.types.length > 0) {
      params = params.append('types', shopParams.types.join(','));
    }
    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    params = params.append('pageSize', shopParams.pageSize);
    params = params.append('pageIndex', shopParams.pageNumber);

    return this.httpClient.get<Pagination<Product>>(
      this.baseUrl + '/products',
      { params }
    );
  }

  getProduct(id: number) {
    return this.httpClient.get<Product>(this.baseUrl + '/products/' + id);
  }
  getTypes() {
    if (this.types.length > 0) return;
    this.httpClient.get<string[]>(this.baseUrl + '/products/types').subscribe({
      next: (response) => {
        this.types = response;
      },
      error: (error: any) => {
        console.error('Error fetching product types:', error);
      },
    });
  }

  getBrands() {
    if (this.brands.length > 0) return;
    this.httpClient.get<string[]>(this.baseUrl + '/products/brands').subscribe({
      next: (response) => {
        this.brands = response;
      },
      error: (error: any) => {
        console.error('Error fetching product brands:', error);
      },
    });
  }
}
