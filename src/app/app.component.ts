import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  numbers: number[] = [];


  onIntervalFired(number: number) {
    this.numbers.push(number);
  }

}
