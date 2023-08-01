import {Component, OnInit} from '@angular/core';
import {Iingredients} from "../../interfaces/ingredients.interface";
import {IngredientService} from "../../services/ingredient.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{

  ingredient: Iingredients = {
    name:"",
    amount:0
  };
  ingredientList:Iingredients[] =[];

  selectedIngredient: Iingredients| undefined;

  showDefaultButtons:Boolean=true;
  showUpdateButtons:Boolean =false;

  constructor(private ingredientsService:IngredientService) {
  }
  ngOnInit(): void {
    this.ingredientList = this.ingredientsService.getIngredients();
  }

  isValid(){
    return this.ingredient.name && this.ingredient.amount &&  this.ingredient.amount > 0;
  }

  saveNewIngredient(){
    this.ingredientsService.saveIngredients(this.ingredient)
    this.ngOnInit();

  }

  clearButton(){
    this.ingredient.name="";
    this.ingredient.amount = 0;
    this.showDefaultButtons = true;
    this.showUpdateButtons =false;
  }

  showIngredientFeatures(index:Iingredients){
    this.showDefaultButtons = false;
    this.showUpdateButtons =true;
    this.selectedIngredient =index;
    this.ingredient.name = this.selectedIngredient.name;
    this.ingredient.amount = this.selectedIngredient.amount;
  }

  deleteButton(){
    if (this.selectedIngredient !==undefined){
      this.ingredientsService.deleteIngredient(this.selectedIngredient);
    }
    this.ngOnInit();
    this.clearButton();
  }
  updateButton(){
    if (this.selectedIngredient  !== undefined){
      this.ingredientsService.updateIngredient(this.selectedIngredient,this.ingredient);
    }
    this.ngOnInit();
    this.clearButton();
  }
}
