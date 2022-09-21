import { Ingredient } from 'src/app/shared/ingredient.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private _list = [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)];

  constructor() {}

  public get list(): Ingredient[] {
    return [...this._list];
  }

  addIngredients(ingredients: Ingredient[]) {
    this._list.push(...ingredients);
    this.ingredientsChanged.emit([...this._list]);
  }

  addIngredient(item: Ingredient) {
    this._list.push(item);
    this.ingredientsChanged.emit([...this._list]);
  }
}
