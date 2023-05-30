import { Component, OnInit } from '@angular/core';
import {IUsers} from "../../../models/users";
import {SettingsService} from "../../../services/settings/settings.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passChange: FormGroup;
  oldPass: string;
  newPass: string;
  newPassRepeat: string;

  constructor(
      private settingsService: SettingsService,
      private messageService: MessageService,
      private userService: UserService) {
  }

  ngOnInit(): void {
    this.passChange = new FormGroup<any>({
      oldPass: new FormControl('', {validators: Validators.required}),
      newPass: new FormControl('', {validators: Validators.required}),
      newPassRepeat: new FormControl('', {validators: Validators.required})
    })
    this.userService.getUser()
  }


  onSubmit(): void {
  }

  passChangeCheck(ev: Event): void | boolean {
    const userPsw = this.userService.getUser()?.psw;
    if (userPsw !== this.oldPass) {
      this.messageService.add({severity: 'warn', summary: 'Invalid current passwords'});
      return false
    }
    if (this.newPass !== this.newPassRepeat) {
      this.messageService.add({severity: 'error', summary: 'New passwords do not match'});
      return false
    } else {
      this.messageService.add({severity: 'success', summary: 'Password successfully changed'});
      const user = this.userService.getUser();
      const newUser = <IUsers>{...user};
      newUser.psw = this.newPass
      this.userService.setUser(newUser);
    }
  }
}
