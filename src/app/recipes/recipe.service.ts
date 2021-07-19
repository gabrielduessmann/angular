import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../ingredients/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [];

    constructor(private shoppingService: ShoppingListService) {}

    public getRecipes(): Recipe[] {
        return this.recipes.slice(); // get a copy
    }

    public getRecipeByIndex(index: number): Recipe {
      return this.recipes.slice()[index];
    }

    public sendIngredientsToShoppingList(ingredients: Ingredient[]): void {
      this.shoppingService.addIngredients(ingredients);
    }

    public addRecipe(recipe: Recipe): void  {
      this.recipes.push(recipe);
      this.recipesWasChanged();
    }

    public updateRecipe(recipe: Recipe, index: number): void {
      this.recipes[index] = recipe;
      this.recipesWasChanged();
    }

    private recipesWasChanged(): void {
      this.recipesChanged.next(this.recipes.slice());
    }

    public deleteRecipe(index: number): void {
      this.recipes.splice(index, 1);
      this.recipesWasChanged();
    }

    public setRecipes(recipes: Recipe[]): void {
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

}