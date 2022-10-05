import { Recipe } from './../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  recipe!: Recipe;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.recipes[+params['id']];
      this.editMode = this.recipe != null;

      if (!this.editMode) {
        this.recipe = new Recipe('', '', '', []);
      }
    });
  }

  onDeleteIngredient(ingredient: Ingredient) {
    this.recipe.ingredients.splice(
      this.recipe.ingredients.findIndex(
        (ingredientCur) => ingredient === ingredientCur
      ),
      1
    );
  }

  onAddIngredient() {
    this.recipe.ingredients.push(new Ingredient('', 0));
  }

  onSave(newTitle: string, newDescription: string, newImage: string) {
    this.recipe.name = newTitle;
    this.recipe.description = newDescription;
    this.recipe.imagePath = newImage;

    if (!this.editMode) {
      this.recipeService;
    }

    this.router.navigate([
      '/recipes',
      this.recipeService.recipes.indexOf(this.recipe),
    ]);
  }
}
