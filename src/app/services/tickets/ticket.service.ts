import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {ICustomTicketData, INearestTour, ITourLocation, ITours, ITourTypeSelect} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketSubject = new Subject<ITourTypeSelect>();
  readonly ticketType$ = this.ticketSubject.asObservable();
  private ticketUpdateSubject = new Subject<ITours[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();

  constructor(private ticketServiceRest: TicketRestService) { }

  getTickets(): Observable<ITours[]> {
    return this.ticketServiceRest.getTickets().pipe(map((value) => {
      const singleTour = value.filter((el) => el.type === "single")
      return value.concat(singleTour);
    }))
  }

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }

  updateTour(type:ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  getError(): Observable<any> {
    return this.ticketServiceRest.getRestError();
  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets();
  }

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList();
  }

  transformData(data:INearestTour[], regions:ITourLocation[]): ICustomTicketData[] {
    const newTicketData: ICustomTicketData[] = [];
    data.forEach((el) => {
      const newEl = <ICustomTicketData> {...el};
      newEl.region = <ICustomTicketData>regions.find((regions) => el.locationId === regions.id) || {};
      newTicketData.push(newEl);
    });
    return newTicketData;
  }

  getRandomNearestEvent(type:number): Observable<INearestTour> {
    return this.ticketServiceRest.getRandomNearestEvent(type);
  }

  sendTourData(data: any): Observable<any > {
    return this.ticketServiceRest.sendTourData(data);
  }

  getTicketById(id: string): Observable<ITours> {
    return this.ticketServiceRest.getTicketById(id);
  }

  updateTicketList(data: ITours[]) {
    this.ticketUpdateSubject.next(data);
  }

  createTour (body:any) {
    return this.ticketServiceRest.createTour(body)
  }
}
