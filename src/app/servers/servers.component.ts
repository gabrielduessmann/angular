import { Component, OnInit } from '@angular/core';
 
@Component({
  // selector: '[app-servers]',
  selector: 'app-servers',
  templateUrl: './servers.component.html'
  // styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer :boolean = false;
  serverCreatiionStatus :String = 'No server was created.';
  serverName = '';
  serverCreated :boolean = false;
  servers = ['TestServer', 'TestServer2']

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.serverCreatiionStatus =  'Server was created. Its name is ' + this.serverName;
    this.servers.push(this.serverName);    
  }

  onUpdateServerName(event: any) {
    // this.serverName = (<HTMLInputElement>event.target).value;
    this.serverName = event.target.value;

  }

}
