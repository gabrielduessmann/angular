import { Component } from '@angular/core';

@Component({
    selector: 'app-server', // for HTML files 
    templateUrl: './server.component.html', // HTML template for my component
    styleUrls: ['./server.component.css']
})
export class ServerComponent {
    serverId: number = 10;
    serverStatus: string = 'offline';

    constructor() {
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    getServerStatus() {
        return this.serverStatus;
    }

    getColor() {
        return this.serverStatus === 'online' ? 'green' : 'red';
    }

}