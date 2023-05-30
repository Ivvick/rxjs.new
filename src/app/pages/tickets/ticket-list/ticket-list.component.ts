import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITours, ITourTypeSelect} from "../../../models/tours";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {Router} from "@angular/router";
import {BlockStyleDirective} from "../../../directive/block-style.directive";
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy, AfterViewInit {

  tickets: ITours[];
  ticketsCopy: ITours[];
  loadCountBlock = false;
  defaultDate: string;
  private tourUnsubscriber: Subscription;

  @ViewChild('tourWrap', {read:BlockStyleDirective}) blockDirective: BlockStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;

  searchTicketSub: Subscription;
  ticketSearchValue: string

  constructor(private ticketService: TicketService,
              private ticketStorage: TicketsStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
        (data) => {
      this.tickets = data;
      this.ticketsCopy = [...this.tickets];
      this.ticketStorage.setStorage(data);
          })

    this.ticketService.ticketUpdateSubject$.subscribe((data) => {
      this.tickets = data || null;
    })


      this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data: ITourTypeSelect) => {
        console.log('data', data)
        setTimeout(() => {

          this.blockDirective.updateItems();

          this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
        });

        // this.ticketService.updateTicketList()



        let ticketType: string;
        switch (data.value) {
          case "single":
            this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
            break;
          case "multi":
            this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
            break;
          case "all":
            this.tickets = [...this.ticketsCopy];
            break;
        }

        if (data.date) {
          const dateWithoutTime = new Date(data.date).toISOString().split('T');
          const dateValue = dateWithoutTime[0]
          console.log('dateValue',dateValue)
          this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
        }

      });
  }

  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.pipe(
        debounceTime(200)).subscribe((ev:any) => {
          if (this.ticketSearchValue) {
            this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
          } else {
            this.tickets = [...this.ticketsCopy];
          }
        });
  }

  goToTicketInfoPage(item: ITours) {
    this.router.navigate([`/tickets/ticket/${item._id}`]);
  }

  directiveRenderComplete(ev: boolean) {
    this.blockDirective.initStyle(0);
    this.loadCountBlock = true;
  }

  findTours(ev: Event) {
    const searchValue = (<HTMLInputElement>ev.target).value;

    if (searchValue) {
      this.tickets = this.ticketsCopy.filter((el) => el.name.includes(searchValue));
    } else {
      this.tickets = [...this.ticketsCopy];
    }
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
  }
}
