import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  baseUrl = 'http://localhost:5001/api';
  protected title = 'client';
  productList: Product[] = [];

  private httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.httpClient
      .get<Pagination<Product>>(this.baseUrl + '/products')
      .subscribe({
        next: (response) => {
          this.productList = response.data;
        },
        error: (error: any) => {
          console.error('Error fetching version:', error);
          this.title = 'Error fetching version';
        },
        complete: () => {
          console.log('Product fetch complete');
        },
      });
  }
}
