import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RestinterceptorsService} from "./services/interceptors/restinterceptors.service";
import {ConfigService} from "./services/config/config.service";

function initializeApp (config: ConfigService) {
return () => config.loadPromise().then(() => {
  console.log('_config loaded', ConfigService.config)
});
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: RestinterceptorsService, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
