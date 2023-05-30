import { Component, OnInit } from '@angular/core';
import {IOrder} from "../../models/order";
import {OrdersService} from "../../services/orders/orders.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  cols = [
    {field: 'age', header: 'Age'},
    {field: 'birthDay', header: 'Birthday'},
    {field: 'cardNumber', header: 'Card Number'},
    {field: 'tourId', header: 'Tour ID'},
    {field: 'userId', header: 'User ID'},
  ];

  orders: IOrder[];

  constructor(private orderService: OrdersService) {
  }
  ngOnInit(): void {
    this.orderService.getOrdersList().subscribe((data) => {
      this.orders = data;
    })
  }
}
