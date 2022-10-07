import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  recipe!: Recipe;
  recipeList?: Recipe[];
  index?: number;
  editMode = false;

  recipeForm = new FormGroup<RecipeForm>({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ingredients: new FormArray([
      new FormGroup({
        ingName: new FormControl('', Validators.required),
        ingAmount: new FormControl('', [
          Validators.required,
          Validators.pattern(new RegExp('^[1-9][0-9]*$')),
        ]),
      }),
    ]),
    imageURL: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  public get ingredientsFormArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  ngOnInit(): void {
    this.recipeService.recipesObservable.subscribe((recipeList) => {
      this.recipeList = recipeList;
      this.route.params.subscribe((params: Params) => {
        this.index = +params['id'];

        this.recipe = recipeList[+params['id']];
        this.editMode = this.recipe != null;

        if (!this.editMode) {
          this.recipe = new Recipe('', '', '', []);
        } else {
          for (
            let index = 0;
            index < this.recipe.ingredients.length - 1;
            index++
          ) {
            this.ingredientsFormArray.push(
              new FormGroup({
                ingName: new FormControl(''),
                ingAmount: new FormControl(''),
              })
            );
          }

          this.recipeForm.setValue({
            name: this.recipe.name,
            description: this.recipe.description,
            ingredients: this.recipe.ingredients.map((ingredient) => {
              return {
                ingName: ingredient.name,
                ingAmount: ingredient.amount.toString(),
              };
            }),
            imageURL: this.recipe.imagePath,
          });
        }
      });
    });
  }

  onDeleteIngredient(index: number) {
    const ingredients = this.recipeForm.get('ingredients') as FormArray;
    ingredients.controls.splice(index, 1);
  }

  onAddIngredient() {
    this.ingredientsFormArray.push(
      new FormGroup({
        ingName: new FormControl('', Validators.required),
        ingAmount: new FormControl('', Validators.required),
      })
    );
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const newRec = new Recipe(
        this.recipeForm.get('name')!.value!,
        this.recipeForm.get('description')!.value!,
        this.recipeForm.get('imageURL')!.value!,
        []
      );

      this.ingredientsFormArray.controls.forEach((ingredient) => {
        newRec.ingredients.push(
          new Ingredient(
            ingredient.get('ingName')!.value,
            ingredient.get('ingAmount')?.value
          )
        );
      });

      if (this.editMode) {
        this.recipeService.updateRecipe(this.index!, newRec);
        this.router.navigate(['/recipes', this.index]);
      } else {
        this.recipeService.addRecipe(newRec);
        this.router.navigate(['/recipes', this.recipeList?.indexOf(newRec)]);
      }
    }
  }

  validate(propName: string) {
    const isFieldValid = this.recipeForm.get(propName)?.valid;
    const isFieldTouched = this.recipeForm.get(propName)?.touched;

    if (isFieldTouched) {
      if (isFieldValid) {
        return { 'is-valid': true };
      } else {
        return { 'is-invalid': true };
      }
    } else {
      return {};
    }
  }
}

interface RecipeForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  ingredients: FormArray<
    FormGroup<{
      ingName: FormControl<string | null>;
      ingAmount: FormControl<string | null>;
    }>
  >;
  imageURL: FormControl<string | null>;
}
