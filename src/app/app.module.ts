import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';

// alerts
import { SuccessAlertComponent } from './alerts/success/success-alert.component';
import { WarningAlertComponent } from './alerts/warning/warning-alert.component';

import {UserComponent} from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent, // adding my new component (/server/server.component.ts)
    ServersComponent, 
    SuccessAlertComponent,
    WarningAlertComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
