import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IOrder} from "../../../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrdersRestService {

  constructor(private http: HttpClient) { }

  getOrdersList(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`http://localhost:3000/order/`);
  }
}
