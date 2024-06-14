import { Target } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from 'src/app/common/country';
import { Customer } from 'src/app/common/customer';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  storage: Storage = sessionStorage;
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];
  states: State[] = [];
  billingStates: State[] = [];
  shippingStates: State[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private formService: ShopFormService,
    private checkoutService: CheckoutService
  ) {
    this.checkoutFormGroup = this.createForms();
  }

  private createForms() {
    const sessionEmail: string = this.storage.getItem('email') || '';
    const parsedEmail = JSON.parse(sessionEmail);
    return this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace,
        ]),
        email: new FormControl(parsedEmail, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace,
        ]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Luv2ShopValidators.notOnlyWhiteSpace,
        ]),
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace,
        ]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Luv2ShopValidators.notOnlyWhiteSpace,
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhiteSpace,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
        ]),
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });
  }

  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    const purchase: Purchase = new Purchase();

    //add addresses
    const shippingAddress = this.checkoutFormGroup.get('shippingAddress');
    if (shippingAddress) {
      purchase.shippingAddress = {
        city: shippingAddress.get('city')?.value,
        country: shippingAddress.get('country')?.value.name,
        state: shippingAddress.get('state')?.value.name,
        street: shippingAddress.get('street')?.value,
        zipCode: shippingAddress.get('zipCode')?.value,
      };
    }

    const billingAddress = this.checkoutFormGroup.get('billingAddress');
    if (billingAddress) {
      purchase.billingAddress = {
        city: billingAddress.get('city')?.value,
        country: billingAddress.get('country')?.value.name,
        state: billingAddress.get('state')?.value.name,
        street: billingAddress.get('street')?.value,
        zipCode: billingAddress.get('zipCode')?.value,
      };
    }

    //create Customer
    // const customer: Customer = new Customer();
    // const { firstName, lastName, email } =
    //   this.checkoutFormGroup.get('customer')?.value;
    // customer.firstName = firstName;
    // customer.lastName = lastName;
    // customer.email = email;
    const customer = this.checkoutFormGroup.get('customer')?.value as Customer;
    console.log(customer);

    purchase.customer = customer;

    //create order and orderItems
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    purchase.order = order;
    const orderItems: OrderItem[] = this.cartService.cartItems.map(
      (item) => new OrderItem(item)
    );

    purchase.orderItems = orderItems;

    // purchase: Purchase = createPurchase();

    let orderTrackingNumber: string;

    this.checkoutService.placeOrder(purchase).subscribe({
      next: (data) => {
        orderTrackingNumber = data.orderTrackingNumber;
        console.log(orderTrackingNumber);
        alert(`Tracking number: ${orderTrackingNumber}`);
        this.resetCart();
      },
      error: (err) => {
        alert(`Error occurred: ${err.message}`);
      },
    });
  }
  resetCart() {
    this.cartService.resetCart();
    this.checkoutFormGroup.reset();
    this.router.navigateByUrl('/products');
  }

  ngOnInit(): void {
    this.reviewCartDetails();

    this.getCreditCardDateRange();

    this.populateCountries();
  }

  private getCreditCardDateRange() {
    let currentMonth = new Date().getMonth() + 1;
    this.formService
      .getCreditCardMonths(currentMonth)
      .subscribe((data) => (this.creditCardMonths = data));
    this.formService
      .getCreditCardYears()
      .subscribe((data) => (this.creditCardYears = data));
  }

  private reviewCartDetails() {
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.billingStates = this.shippingStates;
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingStates = [];
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

  populateCountries() {
    this.formService.getCountries().subscribe((data) => {
      this.countries = data;
      const firstCountry = this.countries[0].name;
      //this.populateStates('shippingAddress');
    });
  }
  populateStates(formName: string) {
    const country = this.checkoutFormGroup.controls[formName].value.country;

    this.formService.getStates(country.code).subscribe((data) => {
      if (formName == 'shippingAddress') {
        this.shippingStates = data;
      } else {
        this.billingStates = data;
      }
    });
  }
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get shippingAddressZipcode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get billingAddressZipcode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get creditCardType() {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  get creditCardNameOnCard() {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  get creditCardNumber() {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode() {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }

  // get creditCardExpirationMonth() {
  //   return this.checkoutFormGroup.get('creditCard.expirationMonth');
  // }

  // get creditCardExpirationYear() {
  //   return this.checkoutFormGroup.get('creditCard.expirationYear');
  // }
}
