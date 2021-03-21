import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/ingredients/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('itemName') itemNameRef: ElementRef;
  @ViewChild('itemQuantity') itemQuantityRef: ElementRef;
  @Output() newIngredientEvent = new EventEmitter<Ingredient>();

  addItem(): void {
    const newIngredient = new Ingredient(
          this.itemNameRef.nativeElement.value, this.itemQuantityRef.nativeElement.value);
    this.newIngredientEvent.emit(newIngredient)
    this.clearInputData();
  }

  clearInputData(): void {
    this.itemNameRef.nativeElement.value = "";
    this.itemQuantityRef.nativeElement.value = "";
  }

}
