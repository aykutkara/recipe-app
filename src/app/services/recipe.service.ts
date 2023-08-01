import { Injectable } from '@angular/core';
import {IRecipe} from "../interfaces/recipe.interface";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private localStorageKey = 'recipes';

  constructor() { }

  getRecipes(): IRecipe[] {
    const recipesString = localStorage.getItem(this.localStorageKey);
    return recipesString ? JSON.parse(recipesString) : [];
  }

  saveRecipe(recipe: IRecipe): void {
    const recipes = this.getRecipes();
    recipes.push(recipe);
    localStorage.setItem(this.localStorageKey, JSON.stringify(recipes));
  }

  deleteRecipe(recipe: IRecipe): void {
    const recipes = this.getRecipes();
    const index = recipes.findIndex(r => r.name === recipe.name);
    if (index !== -1) {
      recipes.splice(index, 1);
      localStorage.setItem(this.localStorageKey, JSON.stringify(recipes));
    }
  }

  updateRecipe(recipe: IRecipe, newUpdateData:IRecipe){
    const recipes =  this.getRecipes();
    const index = recipes.findIndex(r => r.name === recipe.name);
    recipes[index] = newUpdateData;
    localStorage.setItem(this.localStorageKey, JSON.stringify(recipes));
  }

}
