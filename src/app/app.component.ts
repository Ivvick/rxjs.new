import { Component } from '@angular/core';
import {ObservableExampleService} from "./services/test/observable-example.service";
import {ConfigService} from "./services/config/config.service";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticketSales2022';
  constructor(private testing: ObservableExampleService,
              private configService: ConfigService,
              private userService: UserService)
  {testing.initObservable()}

  ngOnInit () {
    this.configService.configLoad()


    // Observable
    const myObservable = this.testing.getObservable();
    myObservable.subscribe((data) => {
      // console.log('first myObservable data')
    })

    myObservable.subscribe((data) => {
      // console.log('second myObservable data')
    })

    //Behavior Subject
    const myBehavior = this.testing.getBehaviorSubject();
    myBehavior.subscribe((data) => {
      console.log('first data BehaviorData', data);
    });

    myBehavior.next('new data from behaviorSubject');
    myBehavior.next('new data1 from behaviorSubject');
  }


}
