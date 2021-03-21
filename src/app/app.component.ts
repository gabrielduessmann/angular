import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pageToBeDisplayed: string = 'recipes' 

  selectPage(page: string) {
    this.pageToBeDisplayed = page;
  }

}
