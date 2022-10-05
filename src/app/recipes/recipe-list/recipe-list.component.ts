import { RecipeService } from '../../shared/recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = this.recipeService.recipes;
  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {}

  onNew() {
    this.router.navigate(['recipes/new']);
  }
}
