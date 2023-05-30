import { Injectable } from '@angular/core';
import {ITours} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketsStorageService {
  private ticketStorage: ITours[]

  constructor() { }

  setStorage(data: ITours[]): void {
    // запись данных в this.ticketStorage
    this.ticketStorage = data;
  }
  getStorage(): ITours[] {
    // возвращает в this.ticketStorage
    return this.ticketStorage;
  }
}
