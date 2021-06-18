import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/ingredients/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input()recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }


  public sendIngredientsToShoppingList():void {
    this.recipeService.sendIngredientsToShoppingList(this.recipe.ingredients);
  }

}
