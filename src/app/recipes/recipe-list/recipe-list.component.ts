import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Test Recipe", "This is the description", "https://www.recipetineats.com/wp-content/uploads/2014/06/Pasta1.jpg"),
    new Recipe("Test Recipe 2", "This is another description", "https://www.recipetineats.com/wp-content/uploads/2014/06/Pasta1.jpg")
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
