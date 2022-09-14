import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'this is a test',
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/Koldskaal_with_strawberries_and_kammerjunker.jpg'
    ),
    new Recipe(
      'A test recipe',
      'this is a test',
      'https://upload.wikimedia.org/wikipedia/commons/0/0f/Koldskaal_with_strawberries_and_kammerjunker.jpg'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
