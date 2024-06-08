import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  test: string = '';
  orderList: OrderHistory[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    this.orderService.getOrderHistory('dsds').subscribe((data) => {
      //console.log(data._embedded.orders);
      console.log(data);
      this.test = JSON.stringify(data);
    });
  }
}
