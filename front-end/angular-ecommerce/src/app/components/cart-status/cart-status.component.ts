import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css'],
})
export class CartStatusComponent implements OnInit {
  totalQuantity: number = 0;
  totalPrice: number = 0.0;
  test: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }
}
