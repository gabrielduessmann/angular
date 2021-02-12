import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';

// alerts
import { SuccessAlertComponent } from './alerts/success/success-alert.component';
import { WarningAlertComponent } from './alerts/warning/warning-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent, // adding my new component (/server/server.component.ts)
    ServersComponent, 
    SuccessAlertComponent,
    WarningAlertComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
