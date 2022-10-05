import { ShoppingListService } from './../../shared/shopping-list.service';
import { RecipeService } from '../../shared/recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe | undefined;

  constructor(
    private recipeService: RecipeService,
    private shoppingService: ShoppingListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((path) => {
      this.selectedRecipe = this.recipeService.recipes[path['id']];
    });
  }

  sendIngredientsToShopping() {
    this.shoppingService.addIngredients(this.selectedRecipe!.ingredients);
  }
}
