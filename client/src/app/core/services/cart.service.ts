import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, CartItem } from '../../shared/models/cart.model';
import { Product } from '../../shared/models/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private httpClient = inject(HttpClient);

  baseUrl = environment.apiUrl;
  cartSignal = signal<Cart | null>(null);

  itemCount = computed(() => {
    return this.cartSignal()?.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  });

  totals = computed(() => {
    const cart = this.cartSignal();
    if (!cart) {
      return null;
    }
    const subtotal = cart.items.reduce(
      (totalPrice, item) => totalPrice + item.price * item.quantity,
      0
    );
    const shipping = 0;
    const discount = 0;
    return {
      subtotal,
      shipping,
      discount,
      total: subtotal + shipping - discount,
    };
  });
  getCart(id: string) {
    return this.httpClient.get<Cart>(this.baseUrl + '/cart?id=' + id).pipe(
      map((cart) => {
        this.cartSignal.set(cart);
        return cart;
      })
    );
    // .subscribe({
    //   next: (cartResponse) => this.cartSignal.set(cartResponse),
    // });
  }
  setCart(cart: Cart) {
    return this.httpClient.post<Cart>(this.baseUrl + '/cart', cart).subscribe({
      next: (cartResponse) => this.cartSignal.set(cartResponse),
    });
  }

  addItemToCart(item: CartItem | Product, quantity = 1) {
    const cart = this.cartSignal() ?? this.createCart();
    if (this.isProduct(item)) {
      item = this.mapProductToCart(item);
    }
    cart.items = this.addOrUpdateItem(cart.items, item, quantity);
    this.setCart(cart);
  }
  addOrUpdateItem(
    items: CartItem[],
    item: CartItem,
    quantity: number
  ): CartItem[] {
    const index = items.findIndex((x) => x.productId == item.productId);
    if (index === -1) {
      item.quantity = quantity;
      items.push(item);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  removeItemFromCart(productId: number, quantity = 1) {
    const cart = this.cartSignal();
    if (!cart) return;
    const index = cart.items.findIndex((x) => x.productId == productId);
    if (index != -1) {
      if (cart.items[index].quantity > quantity) {
        cart.items[index].quantity -= quantity;
      } else {
        cart.items.splice(index, 1);
      }
      if (cart.items.length == 0) {
        this.deleteCart(cart);
      } else {
        this.setCart(cart);
      }
    }
  }
  deleteCart(cart: Cart) {
    return this.httpClient
      .delete<boolean>(this.baseUrl + '/cart?id=' + cart.id)
      .subscribe({
        next: (isDeleted) => {
          if (isDeleted) {
            localStorage.removeItem('cart_id');
            this.cartSignal.set(null);
          }
        },
      });
  }
  mapProductToCart(item: Product): CartItem {
    return {
      productId: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.brand,
      type: item.brand,
    };
  }
  private isProduct(item: CartItem | Product): item is Product {
    return (item as Product).id !== undefined;
  }
  createCart(): Cart {
    const cart = new Cart();
    localStorage.setItem('cart_id', cart.id);
    return cart;
  }
}
