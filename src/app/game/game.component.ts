import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() intervalFired = new EventEmitter<number>();
  interval;
  lastNumber: number = 0;

  startGame() {
    if (!this.interval) { // make sure the user can click only once
      this.interval = setInterval(() => {
        this.intervalFired.emit(this.lastNumber + 1);
        this.lastNumber++;
      }, 1000);
    }
  }

  pauseGame() {
    clearInterval(this.interval);
    this.interval = null; 
  }

}
