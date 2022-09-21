import { ShoppingListService } from './../shared/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.list;

    this.shoppingService.ingredientsChanged.subscribe((newList) => {
      this.ingredients = newList;
    });
  }
}
