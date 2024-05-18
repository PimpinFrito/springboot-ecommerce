import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private formService: ShopFormService
  ) {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
  }

  onSubmit() {
    console.log('Submitted');
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

  ngOnInit(): void {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
    //Get month and year list from FormService
    let currentMonth = new Date().getMonth() + 1;
    this.formService
      .getCreditCardMonths(currentMonth)
      .subscribe((data) => (this.creditCardMonths = data));
    this.formService
      .getCreditCardYears()
      .subscribe((data) => (this.creditCardYears = data));
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYears() {
    let selectedYear =
      +this.checkoutFormGroup.controls['creditCard'].value.expirationYear;
    let currentYear = new Date().getFullYear();
    let startingMonth: number;

    //IF selected month == current year, starting month will be the currentMonth +1 as it starts at 0
    //else start from 1 aka January
    if (selectedYear === currentYear) {
      startingMonth = new Date().getMonth() + 1;
    } else {
      startingMonth = 1;
    }
    this.formService
      .getCreditCardMonths(startingMonth)
      .subscribe((data) => (this.creditCardMonths = data));
  }
}
