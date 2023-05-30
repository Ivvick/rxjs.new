import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {OrdersRestService} from "../rest/order-rest/orders-rest.service";
import {IOrder} from "../../models/order";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private ordersRestService: OrdersRestService,
              private userService: UserService) { }


  getOrdersList(): Observable<IOrder[]> {
      // const id = this.userService.getUser()?.id;
    return this.ordersRestService.getOrdersList().pipe(
        map((data) => {
          const newDataArr: IOrder[] = [];
          data.forEach((el) => {
            const newDataObj: IOrder = {

              age: el.age,
              birthDay: el.birthDay,
              cardNumber: el.cardNumber,
              tourId: el.tourId,
              userId: el.userId,
            };
            newDataArr.push(newDataObj);
          })
          return newDataArr;
        }))
}}
