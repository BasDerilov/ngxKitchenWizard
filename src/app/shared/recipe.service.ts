import { Recipe } from '../recipes/recipe.model';
import { AfterContentInit, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';
import { __spreadArray } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private _recipes: Recipe[] = [
    new Recipe(
      'Top Sirloin Hot Pot',
      'Heat the oil in a medium, heavy saucepan over medium-high heat until hot. Stir in the mushrooms and ',
      'https://d2v9mhsiek5lbq.cloudfront.net/eyJidWNrZXQiOiJsb21hLW1lZGlhLXVrIiwia2V5IjoiZm9vZG5ldHdvcmstaW1hZ2UtNjdiNGJhNmMtZDYxZi00MWIzLTlkZjMtYWNhOWMwZWIxZDZhLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiY292ZXIiLCJ3aWR0aCI6NzUwLCJoZWlnaHQiOjQyMn0sImpwZWciOnsicXVhbGl0eSI6NTUsInByb2dyZXNzaXZlIjp0cnVlfX19',
      [
        new Ingredient('Sirloin', 1),
        new Ingredient('Mushroom', 5),
        new Ingredient('Soy Sauce', 1),
      ]
    ),
    new Recipe(
      'Herbed Chicken Marsala',
      'Place the chicken cutlets between 2 pieces of plastic wrap and pound with a meat mallet',
      'https://d2v9mhsiek5lbq.cloudfront.net/eyJidWNrZXQiOiJsb21hLW1lZGlhLXVrIiwia2V5IjoiZm9vZG5ldHdvcmstaW1hZ2UtMjU0ZWMwZWQtY2YzMC00YWQyLWI0OTgtMWYyMmI1M2QwYzQwLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjo3NTAsImhlaWdodCI6NDIyfSwianBlZyI6eyJxdWFsaXR5Ijo1NSwicHJvZ3Jlc3NpdmUiOnRydWV9fX0=',
      [
        new Ingredient('Flour', 5),
        new Ingredient('Olive', 4),
        new Ingredient('Chicken Broth', 2),
      ]
    ),

    new Recipe(
      'Rødgrød med fløde',
      'Rødgrød med fløde er en rigtig dansk sommerklassiker og det smager virkelig dejligt med sommerens solmodne bær.',
      'https://www.valdemarsro.dk/wp-content/2014/06/roedgroed-floede_.jpg',
      [new Ingredient('Fruit', 600)]
    ),
  ];

  recipesObservable = new Observable<Recipe[]>((subscriber) => {
    subscriber.next(this._recipes);
  });

  constructor() {}

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this._recipes[index] = updatedRecipe;
  }
}
