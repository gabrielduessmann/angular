import { Ingredient } from "../ingredients/ingredient.model";
import { Subject } from 'rxjs';

export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient ("Tomato", 2),
        new Ingredient ("Apples", 5),
        new Ingredient ("Orange", 10),
        new Ingredient ("Papaya", 100)
    ];

    public ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
    public startedEditing = new Subject<number>();

    public getIngredients(): Ingredient[] {
        return this.ingredients.slice();
    } 

    public addIngredient(ingredient: Ingredient): void {

        const thereIsNoRepeatedIngredient: number = -1;
    
        let indexRepeatedIngredient: number = this.isRepeatedIngredient(ingredient.name)
      
        if (indexRepeatedIngredient === thereIsNoRepeatedIngredient) {
          this.ingredients.push(ingredient); 
        } else {
          const currentIngredientQuantity: number = this.ingredients[indexRepeatedIngredient].quantity;
          const newIngredientQuantity: number = +currentIngredientQuantity + +ingredient.quantity;
          this.ingredients[indexRepeatedIngredient].quantity = newIngredientQuantity;
        }
        this.updateIngredientsList();
    }

    public addIngredients(ingredients: Ingredient[]): void {
        ingredients.forEach(ingredient => this.addIngredient(ingredient));
    }
    
    private isRepeatedIngredient(ingredientName: string): number {
        const indexRepeteadIngredient = this.ingredients.findIndex(ingredient => 
                ingredient.name.toLocaleLowerCase() === ingredientName.toLocaleLowerCase())
       
        return indexRepeteadIngredient;
    }

    public getIngredient(index: number):Ingredient {
        return this.ingredients[index];
    }
       
    public updateIngredient(index: number, ingredientUpdated: Ingredient):void {
        this.ingredients[index] = ingredientUpdated;
        this.updateIngredientsList();
    }   

    public deleteIngredient(index: number):void {
        this.ingredients.splice(index, 1);
        this.updateIngredientsList();
    }

    private updateIngredientsList(): void {
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    
}