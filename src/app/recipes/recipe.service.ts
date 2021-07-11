import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../ingredients/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [
        new Recipe(
          "Pasta Carbonara", 
          "Made with egg and cheese", 
          "https://www.recipetineats.com/wp-content/uploads/2014/06/Pasta1.jpg",
          [
            new Ingredient("Egg", 5),
            new Ingredient("Cheese", 1)
          ]
        ),
        new Recipe(
          "Pasta Bolognese", 
          "Made with meat", 
          "https://www.recipetineats.com/wp-content/uploads/2014/06/Pasta1.jpg",
          [
            new Ingredient("Pasta", 5),
            new Ingredient("Meat", 3)
          ]
        )
    ];

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

}