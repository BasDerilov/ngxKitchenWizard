import { ShoppingListService } from './../shared/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private shoppingServiceSubscription!: Subscription;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.shoppingServiceSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.list;

    this.shoppingServiceSubscription =
      this.shoppingService.ingredientsChanged.subscribe((newList) => {
        this.ingredients = newList;
      });
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }
}
