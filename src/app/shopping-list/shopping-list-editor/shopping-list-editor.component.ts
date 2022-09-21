import { ShoppingListService } from './../../shared/shopping-list.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-editor',
  templateUrl: './shopping-list-editor.component.html',
  styleUrls: ['./shopping-list-editor.component.scss'],
})
export class ShoppingListEditorComponent implements OnInit {
  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddIngredient(name: string, amount: string) {
    this.shoppingService.addIngredient(new Ingredient(name, parseInt(amount)));
  }
}
