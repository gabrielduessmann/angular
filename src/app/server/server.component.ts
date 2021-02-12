import { Component } from '@angular/core';

@Component({
    selector: 'app-server', // for HTML files 
    templateUrl: './server.component.html' // HTML template for my component
})
export class ServerComponent {
    serverId: number = 10;
    serverStatus: string = 'offiline';

    getServerStatus() {
        return this.serverStatus;
    }
}