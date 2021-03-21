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
  @Output() newNumbersArray = new EventEmitter<number[]>();
  interval;
  lastNumber: number = 0;
  @Output('allNumbers') numbers: number[] = [];

  startGame() {
    if (!this.interval) { // make sure the user can click only once
      this.interval = setInterval(() => {
        this.intervalFired.emit(this.lastNumber + 1);
        this.lastNumber++;
      }, 500);
    }
  }

  pauseGame(isClearData: boolean) {
    clearInterval(this.interval);
    this.interval = null; 
    if (isClearData) {
      this.clearData();
    }
  }

  clearData() {
    this.lastNumber = 0;
    const newNumbersArray: number[] = []
    this.newNumbersArray.emit(newNumbersArray);
  }


  
}
