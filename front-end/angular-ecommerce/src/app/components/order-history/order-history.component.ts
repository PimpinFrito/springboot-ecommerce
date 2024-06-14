import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  storage: Storage = sessionStorage;
  orderHistoryList: OrderHistory[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    const theEmail = this.storage.getItem('email') || '';
    const parsedEmail = JSON.parse(theEmail);
    this.orderService.getOrderHistory(parsedEmail).subscribe((data) => {
      console.log(data._embedded);
      this.orderHistoryList = data._embedded.orders;
    });
  }
}
