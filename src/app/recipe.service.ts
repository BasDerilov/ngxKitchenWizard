import { Recipe } from './recipes/recipe.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipeDb: Recipe[] = [
    new Recipe(
      'A test recipe',
      'this is a test',
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/Koldskaal_with_strawberries_and_kammerjunker.jpg'
    ),
    new Recipe(
      'another test recipe',
      'this is a test',
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/Koldskaal_with_strawberries_and_kammerjunker.jpg'
    ),
  ];

  private _selectedRecipe: BehaviorSubject<Recipe>;

  constructor() {
    this._selectedRecipe = new BehaviorSubject<Recipe>(this._recipeDb[0]);
  }

  public get allRecipes(): Recipe[] {
    return this._recipeDb;
  }

  public getSelectedRecipe(): Observable<Recipe> {
    return this._selectedRecipe.asObservable();
  }

  public setCurrentRecipe(newSelection: Recipe) {
    this._selectedRecipe.next(newSelection);
  }
}
