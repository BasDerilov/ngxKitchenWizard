import { RecipeService } from './../../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  readonly recipe$ = this.recipeService.getSelectedRecipe();
  selectedRecipe: Recipe = new Recipe('', '', '');

  constructor(private recipeService: RecipeService) {}
}
