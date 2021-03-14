import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{name: string, content: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{name: string, content: string}>();
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverInput: HTMLInputElement) {
    let serverName: string = serverInput.value;
    this.serverCreated.emit({
      name: serverName, 
      content: this.newServerContent
    });
  }

  onAddBlueprint(blueprintInput: HTMLInputElement) {
    let blueprintName: string = blueprintInput.value;
    this.blueprintCreated.emit({
      name: blueprintName, 
      content: this.newServerContent
    });
  }

}
