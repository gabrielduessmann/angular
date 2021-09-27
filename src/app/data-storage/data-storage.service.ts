import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'}) 
export class DataStorageService {

    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService
    ) {}

    private recipesUrl: string = 'https://angular-app-1e7e1-default-rtdb.firebaseio.com/recipes.json';

    public saveRecipes(): void {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http
            .put(this.recipesUrl, recipes)
            .subscribe(response => {
                console.log(response);     
            });
    }

    public fetchRecipes() {
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.get<Recipe[]>(this.recipesUrl,
                {
                    params: new HttpParams().set('auth', user.token)
                }) 
            }),
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
        )
    }

}