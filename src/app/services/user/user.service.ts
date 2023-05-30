import { Injectable } from '@angular/core';
import {IUsers} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: IUsers | null;
  private token: string | null;

  constructor() { }


  getUser(): IUsers | null {
    // возвращается user
    return this.user;
  };
  setUser(user: IUsers): void {
    // записывается пользователь в this.user
    this.user = user;
  };
  getToken(): string | null {
    console.log(' window.localStorage.getItem(\'Token\');',  window.localStorage.getItem('Token'))
    return this.token || window.localStorage.getItem('Token');
  };
  setToken(token: string): void {
    this.token = token;
    window.localStorage.setItem('Token', token);
  }

  setToStore (token: string): void {
    this.token = token;
  }

  removeInfo() {
    this.user = null;
    this.token = null;
  }
}
