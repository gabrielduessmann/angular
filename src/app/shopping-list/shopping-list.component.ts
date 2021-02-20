import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredients/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient ("Tomato", 2),
    new Ingredient ("Apples", 5),
    new Ingredient ("Orange", 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
