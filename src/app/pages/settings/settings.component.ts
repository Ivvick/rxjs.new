import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {SettingsService} from "../../services/settings/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  subjectForUnsubscribe = new Subject();

  constructor(
      private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data', data);
    });
    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)) .subscribe((data) => {
      console.log('settings data from subject', data);
    })
  }

  ngOnDestroy(): void {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete()
  }
}

