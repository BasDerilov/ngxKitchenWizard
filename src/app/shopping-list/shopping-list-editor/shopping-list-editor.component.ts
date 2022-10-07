import { ShoppingListService } from './../../shared/shopping-list.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.scss'],
})
export class ShoppingListEditorComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription?: Subscription;
  editMode = false;
  editedItemIndex?: number;
  editedItem?: Ingredient;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, parseInt(value.amount));
    if (this.editMode && this.editedItemIndex !== undefined) {
      this.shoppingService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }

    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    if (this.editedItemIndex !== undefined) {
      this.shoppingService.deleteIngredient(this.editedItemIndex);
    }

    this.onClear();
  }
}
