import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  numbers: number[] = [];

  onIntervalFired(number: number) {
    this.numbers.push(number);
  }

  clearData(newNumbersArray: number[]) {
    this.numbers = newNumbersArray;
  }

}
