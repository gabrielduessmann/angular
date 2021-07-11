import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/ingredients/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form', {static: false}) shoppingListForm: NgForm;

  shoppingSubscription: Subscription;
  isEditMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingSubscription = this.shoppingService.startedEditing
      .subscribe(
        (index: number) => {
          this.isEditMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingService.getIngredient(index);
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            quantity: this.editedItem.quantity
          });
        }
      );
  }


  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.quantity);

    if (this.isEditMode) {
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
      this.isEditMode = false;
    }
    else {
      this.shoppingService.addIngredient(newIngredient);
    }
    form.reset();
  }

  clearForm(): void {
    this.shoppingListForm.reset();
    this.isEditMode = false;
  }

  deleteItem(): void {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }

 
  ngOnDestroy(): void {
    this.shoppingSubscription.unsubscribe();
  }
}
