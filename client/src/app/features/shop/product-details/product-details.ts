import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { CartService } from '../../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
//import { MatSnackBar } from '@angular/material/snack-bar';
//import { Snackbar } from '../../../core/services/snackbar';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatButton,
    MatIcon,
    MatFormField,
    MatInput,
    MatLabel,
    MatDivider,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  // private router = inject(Router);
  // private snackbar = inject(Snackbar);

  quantityInCart = 0;
  quantity = 1;
  product?: Product;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.shopService.getProduct(+id).subscribe({
      next: (product) => {
        this.product = product;
        this.updateQuantityInCart();
      },
      error: (err) => console.error(err),
    });
  }

  updateCart() {
    if (!this.product) return;
    if (this.quantity > this.quantityInCart) {
      const itemsToAdd = this.quantity - this.quantityInCart;
      this.quantityInCart += itemsToAdd;
      this.cartService.addItemToCart(this.product, itemsToAdd);
    } else {
      const itemsToRemove = this.quantityInCart - this.quantity;
      this.quantityInCart -= itemsToRemove;
      this.cartService.removeItemFromCart(this.product.id, itemsToRemove);
    }
    //this.router.navigateByUrl('/cart');
    //this.snackbar.success('Updated the cart!');
  }
  updateQuantityInCart() {
    this.quantityInCart =
      this.cartService
        .cartSignal()
        ?.items.find((x) => x.productId == this.product?.id)?.quantity || 0;

    this.quantity = this.quantityInCart || 1;
  }

  getButtonText(): string {
    return this.quantityInCart > 0 ? 'Update cart' : 'Add to cart';
  }
}
