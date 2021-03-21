import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredients/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient ("Tomato", 2),
    new Ingredient ("Apples", 5),
    new Ingredient ("Orange", 10)
  ];

  constructor() { }

  ngOnInit(): void {
  }


  addIngredient(ingredient: Ingredient) {
    const thereIsNoRepeatedIngredient: number = -1;

    let indexRepeatedIngredient: number = this.isRepeatedIngredient(ingredient.name)
  
    if (indexRepeatedIngredient === thereIsNoRepeatedIngredient) {
      this.ingredients.push(ingredient); 
    } else {
      const currentIngredientQuantity: number = this.ingredients[indexRepeatedIngredient].quantity;
      const newIngredientQuantity: number = +currentIngredientQuantity + +ingredient.quantity;
      this.ingredients[indexRepeatedIngredient].quantity = newIngredientQuantity;
    }
  }

  isRepeatedIngredient(ingredientName: string): number {
    const indexRepeteadIngredient = this.ingredients.findIndex(ingredient => 
            ingredient.name.toLocaleLowerCase() === ingredientName.toLocaleLowerCase())
   
    return indexRepeteadIngredient;
  }
}
