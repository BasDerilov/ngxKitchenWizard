import { RecipeService } from '../../shared/recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes?: Recipe[];
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.recipesObservable.subscribe((newList) => {
      this.recipes = newList;
    });
  }
}
