import { Ingredient } from 'src/app/shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private _list = [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)];

  constructor() {}

  public get list(): Ingredient[] {
    return [...this._list];
  }

  getIngredient(index: number) {
    return this._list[index];
  }

  addIngredients(ingredients: Ingredient[]) {
    this._list.push(...ingredients);
    this.ingredientsChanged.next([...this._list]);
  }

  addIngredient(item: Ingredient) {
    this._list.push(item);
    this.ingredientsChanged.next([...this._list]);
  }
}
