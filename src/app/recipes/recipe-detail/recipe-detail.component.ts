import { ShoppingListService } from './../../shared/shopping-list.service';
import { RecipeService } from '../../shared/recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  readonly recipe$ = this.recipeService.getSelectedRecipe();
  selectedRecipe: Recipe = new Recipe('', '', '', []);

  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingListService
  ) {}

  ngOnInit(): void {
    this.recipe$.subscribe((recipe) => {
      this.selectedRecipe = recipe;
    });
  }

  sendIngredientsToShopping() {
    this.shoppingService.addIngredients(this.selectedRecipe.ingredients);
  }
}
