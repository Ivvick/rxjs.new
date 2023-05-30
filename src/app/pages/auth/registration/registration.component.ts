import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUsers} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IServerError} from "../../../models/error";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  email: string;
  cardNumber: string;
  selectedValue: boolean;
  showCardNumber: boolean;
  saveUserInStore: boolean;

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  registration(ev: Event): void | boolean {
    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity:'error', summary:'Passwords do not match'});
    return false
    }

    const userObj: IUsers = {
      psw: this.psw,
      login: this.login,
      email: this.email,
      cardNumber: this.cardNumber
    }

    this.http.post<IUsers>('http://localhost:3000/users/', userObj).subscribe((data) => {
      if (this.saveUserInStore) {
        const objUserJsonStr = JSON.stringify(userObj);
        window.localStorage.setItem('user_'+userObj.login, objUserJsonStr);
      }
      this.messageService.add({severity:'success', summary:'Successfully registered'});

    }, (err: HttpErrorResponse) => {
      console.log('err', err)
      const serverError = <IServerError>err.error;
      this.messageService.add({severity:'warn', summary:serverError.errorText});
    });

    // if (!this.authService.isUserExists(userObj)){
    //   this.authService.setUser(userObj)
    //   this.messageService.add({severity:'success', summary:'Successfully registered'});
    //   if (this.selectedValue) {
    //     const objUserJsonStr = JSON.stringify(userObj);
    //     window.localStorage.setItem('user: '+userObj.login, objUserJsonStr);
    //
    //   }
    // } else {
    //   this.messageService.add({severity:'warn', summary:'User already exists'});
    // }
  }

  saveToLocal(): void {
    if (this.selectedValue) {}
  }

}
