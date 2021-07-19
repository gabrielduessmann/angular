import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from 'rxjs/operators';
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'}) 
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    private recipesUrl: string = 'https://angular-app-1e7e1-default-rtdb.firebaseio.com/recipes.json';

    public saveRecipes(): void {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http
            .put(this.recipesUrl, recipes)
            .subscribe(response => {
                console.log(response);     
            });
    }

    public fetchRecipes(): Observable<Recipe[]> {
        return this.http
            .get<Recipe[]>(this.recipesUrl)
            .pipe(
                map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe, 
                        ingredients: recipe.ingredients ? recipe.ingredients : [] // return empty array for ingredients if the recipe has no ingredients
                    } 
                })
            }), 
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );
    }

}