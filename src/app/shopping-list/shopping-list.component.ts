import { Ingredient } from '../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  private ingredientExists(ingredient: Ingredient): any {
    return this.ingredients.find(
      (thisIngredient) =>
        thisIngredient.name.toLowerCase() === ingredient.name.toLowerCase()
    );
  }

  constructor() {}

  ngOnInit(): void {}

  addNewIngredient(ingredient: Ingredient) {
    const ingredientExists = this.ingredientExists(ingredient);

    if (ingredientExists) {
      const existingIngredient = ingredientExists as Ingredient;
      existingIngredient.amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
  }
}
