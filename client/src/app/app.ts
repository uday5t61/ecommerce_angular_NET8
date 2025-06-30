import { Component } from '@angular/core';
import { Header } from './layout/header/header';
import { CommonModule } from '@angular/common';
import { Shop } from './features/shop/shop';

@Component({
  selector: 'app-root',
  imports: [Header, CommonModule, Shop],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'client';
}
