import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {IUsers} from "../../../models/users";
import {IMenuType} from "../../../models/menuType";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() menuType: IMenuType;
  items: MenuItem[];
  time: Date;
  private timerInterval: number;
  user: IUsers | null;
  private settingsActive = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.items = this.initMenuItems()
    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    },1000);
    this.user = this.userService.getUser()
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Tickets',
        routerLink:['tickets-list']
      },
      {
        label: 'Orders',
        routerLink:['orders']
      },
      {
        label: 'Settings',
        routerLink:['settings'],
        visible: this.settingsActive
      },
      {
        label: 'Quit',
        routerLink:['/auth'],
        command: () => {
          this.userService.removeInfo()
        }

      },

    ];
  }
}
