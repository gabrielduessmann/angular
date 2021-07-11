import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../ingredients/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public ingredients: Ingredient[];
  private intredientChangedSub: Subscription; 

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.intredientChangedSub = this.shoppingService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]):void => {
          this.ingredients = ingredients;
        }
      );
  }

  ngOnDestroy(): void {
    this.intredientChangedSub.unsubscribe();
  }

  editItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }

}
