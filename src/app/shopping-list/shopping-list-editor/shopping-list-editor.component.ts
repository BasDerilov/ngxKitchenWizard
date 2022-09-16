import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.scss'],
})
export class ShoppingListEditorComponent implements OnInit {
  @Output('newIngredient') emitNewIngredient = new EventEmitter<Ingredient>();
  constructor() {}

  ngOnInit(): void {}

  onAddIngredient(name: string, amount: string) {
    this.emitNewIngredient.emit(new Ingredient(name, parseInt(amount)));
  }
}
