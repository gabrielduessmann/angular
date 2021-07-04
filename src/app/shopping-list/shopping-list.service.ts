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
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    public addIngredients(ingredients: Ingredient[]): void {
        ingredients.forEach(ingredient => this.addIngredient(ingredient));
    }
    
    private isRepeatedIngredient(ingredientName: string): number {
        const indexRepeteadIngredient = this.ingredients.findIndex(ingredient => 
                ingredient.name.toLocaleLowerCase() === ingredientName.toLocaleLowerCase())
       
        return indexRepeteadIngredient;
    }
       
        
}