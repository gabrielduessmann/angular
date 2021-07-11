import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit{

    private isEditMode: boolean = false;
    private id: number;
    public recipeForm: FormGroup;
    
    constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {

    }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                   this.id = params["id"]; 
                   this.isEditMode = this.id != null;
                   this.initForm();
                }
            );
    }

    private initForm(): void {
        let recipeName: string = '';
        let recipeImagePath: string = '';
        let recipeDescription: string = '';
        let recipeIngredients: FormArray = new FormArray([]);

        if (this.isEditMode) {
            const recipe: Recipe = this.recipeService.getRecipeByIndex(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe['ingredients']) {
               for (let ingredient of recipe.ingredients) {
                   recipeIngredients.push(
                       new FormGroup({
                           'name': new FormControl(ingredient.name, Validators.required),
                           'quantity': new FormControl(ingredient.quantity, [
                               Validators.required, 
                               Validators.pattern(/^[1-9]+[0-9]*$/)
                            ])
                       })
                   );
               } 
            }
        }
        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients
        });
    }

    public onSubmit(): void {
        const recipe: Recipe = this.recipeForm.value;
        if (this.isEditMode) {
            this.recipeService.updateRecipe(recipe, this.id);
        } 
        else {
            this.recipeService.addRecipe(recipe);
        }
        this.cancel();
    }

    get controls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    public addIngredient(): void {
        console.log(<FormArray>this.recipeForm.get('ingredients'));
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'quantity': new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        );
    }

    public cancel(): void {
        this.router.navigate(['../']), {relativeTo: this.route};
    }

    public deleteIngredient(index: number): void {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }
}