import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../ingredients/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  public ingredients: Ingredient[];

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]):void => {
          this.ingredients = ingredients;
        }
      );
  }

}
