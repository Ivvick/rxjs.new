import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestinterceptorsService implements HttpInterceptor{

  constructor(
      private userService: UserService
  ) { }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable <HttpEvent<any>> {
    const hasToken = this.userService.getToken();
    console.log('hasTOKE>', hasToken)
    if (hasToken) {
      const cloned = req.clone( {
        headers: req.headers.set("Authorization", "Bearer " + hasToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);

    }
  }
}
