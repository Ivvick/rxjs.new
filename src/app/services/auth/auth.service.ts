import { Injectable } from '@angular/core';
import {IUsers} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userStorage: IUsers[] = [];

  constructor() { }

  checkUser(user: IUsers): boolean{
    const isUserExist = this.userStorage.find((el) => el.login === user.login)
    if (isUserExist) {
      return isUserExist.psw === user.psw;
    }
    return false;
  }

  setUser (user: IUsers): void {
    const isUserExist = this.userStorage.find((el) => el.login === user.login)
    if (!isUserExist && user?.login) {
      this.userStorage.push(user)
    }
  }

  isUserExists(user: IUsers): boolean {
    const isUserExist = this.userStorage.find((el) => el.login === user.login)
    return !!isUserExist;
  }
}
