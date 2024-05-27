import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  addToCart(addedCartItem: CartItem) {
    const existingCartItem = this.cartItems.find(
      (listCartItem) => listCartItem.id === addedCartItem.id
    );
    //If existingCartItem is found, just increase the quantity by 1, otherwise add new cartItem to list
    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(addedCartItem);
    }

    this.computeCartTotals();
  }
  computeCartTotals() {
    let runningTotalPrice = 0;
    let runningTotalQuantity = 0;
    for (let item of this.cartItems) {
      runningTotalPrice += item.unitPrice * item.quantity;
      runningTotalQuantity += item.quantity;
    }
    this.totalPrice.next(+runningTotalPrice.toFixed(2));
    this.totalQuantity.next(runningTotalQuantity);

    this.logCartData(runningTotalPrice, runningTotalQuantity);
  }
  logCartData(runningTotalPrice: number, runningTotalQuantity: number) {
    console.log(`Running total price: ${runningTotalPrice}`);
    console.log(`Running total quantity: ${runningTotalQuantity}`);
    this.cartItems.forEach((cart) => console.log(cart));
  }

  decreaseQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity <= 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }
  remove(cartItem: CartItem) {
    const indexofElementToDelete = this.cartItems.indexOf(cartItem);
    console.log(indexofElementToDelete);
    if (indexofElementToDelete > -1) {
      this.cartItems.splice(indexofElementToDelete, 1);
      this.computeCartTotals();
      console.log(this.cartItems);
    }
  }
}
