import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{name: string, content: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{name: string, content: string}>();

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('serverNameInput') serverNameInput: ElementRef;
  @ViewChild('serverContentInput') serverContentInput: ElementRef;

  onAddServer(): void {
    let serverName: string = this.serverNameInput.nativeElement.value;
    let contentName: string = this.serverContentInput.nativeElement.value;

    this.serverCreated.emit({
      name: serverName, 
      content: contentName
    });
  }

  onAddBlueprint(): void {
    let serverName: string = this.serverNameInput.nativeElement.value;
    let contentName: string = this.serverContentInput.nativeElement.value;

    this.blueprintCreated.emit({
      name: serverName, 
      content: contentName
    });
  }

}
