import { Injectable } from '@angular/core';
import {Iingredients} from "../interfaces/ingredients.interface";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private localStorageKey =`ingredients`;
  constructor() { }

  getIngredients():Iingredients[]{
    const ingredientsString = localStorage.getItem(this.localStorageKey);
    return ingredientsString? JSON.parse(ingredientsString) :[];
  }
  saveIngredients(ingredient: Iingredients): void {
    const ingredients = this.getIngredients();
    ingredients.push(ingredient);
    localStorage.setItem(this.localStorageKey, JSON.stringify(ingredients));
  }

  deleteIngredient(ingredient: Iingredients){
    const ingredients = this.getIngredients();
    const index = ingredients.findIndex(r => r.name === ingredient.name);
    if (index !== -1){
      ingredients.splice(index,1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(ingredients));
    }
  }
  updateIngredient(ingredient: Iingredients, newUpdateData:Iingredients){
    const ingredients = this.getIngredients();
    const index = ingredients.findIndex(r => r.name === ingredient.name);
    ingredients[index]= newUpdateData;
    localStorage.setItem(this.localStorageKey, JSON.stringify(ingredients));
  }
}
