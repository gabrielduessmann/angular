import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe(
      "Pasta Carbonara", 
      "Made with egg and cheese", 
      "https://www.recipetineats.com/wp-content/uploads/2014/06/Pasta1.jpg"
    ),
    new Recipe(
      "Pasta Bolognese", 
      "Made with meat", 
      "https://www.recipetineats.com/wp-content/uploads/2014/06/Pasta1.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
