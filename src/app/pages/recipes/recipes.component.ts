import {Component, OnInit} from '@angular/core';
import {IRecipe} from "../../interfaces/recipe.interface";
import {RecipeService} from "../../services/recipe.service";
import {ICard} from "../../interfaces/card.interface";
import {IDropdown} from "../../interfaces/dropdown.interface";
import {IngredientService} from "../../services/ingredient.service";
import {FormArray, FormBuilder, FormGroup, UntypedFormArray, UntypedFormGroup, Validators} from "@angular/forms";
import {Iingredients} from "../../interfaces/ingredients.interface";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit{

  recipes: IRecipe[] = [];

  showPTag: boolean = true;
  showInputDiv: boolean = false;
  showFoodInfos: boolean = false;

  meal: IRecipe = {
    name: '',
    description: '',
    imagePath: '',
    ingredients: []
  };

  cards:ICard[] = [];

  selectedCard: IRecipe | undefined;

  manageRecipeButtonData:IDropdown[]=[
    {
      title:"Manage Recipe",
      options : ["To Shop List","Edit Recipe","Delete Recipe"]
    }
  ];

  parentValueFromChild: string = "";

  // @ts-ignore
  recipeForm: UntypedFormGroup;

  constructor(private recipeService: RecipeService,
              private ingredientService:IngredientService,
              private fb:FormBuilder) {
  }
  ngOnInit(): void {
    this.cards = this.recipeService.getRecipes();
    this.initForm();
  }

  initForm(): void {
    this.recipeForm = this.fb.group({
      name : ["",Validators.required],
      description :["",Validators.required],
      imagePath : ["",Validators.required],
      ingredients : this.fb.array([])
    })
  }
  saveMeal(): void {
    this.recipeForm.markAllAsTouched();
    if (this.selectedCard !== undefined){
      if (this.recipeForm.valid){
        this.recipeService.updateRecipe(this.selectedCard,this.recipeForm.value);
        this.selectedCard = undefined;
        this.ngOnInit();
      }
      else{
        return;
      }
    }
    else {
      if (this.recipeForm.valid){
        this.recipeService.saveRecipe(this.recipeForm.value);
        this.ngOnInit();
      }
      else{
        this.recipeForm.markAllAsTouched();
        //alert("Lütfen tüm alanları doldurunuz.")
        return;
      }
    }
    this.showPTagFunc();
  }
  showInputDivFunc(){
    this.showInputDiv = true;
    this.showPTag = false;
    this.showFoodInfos = false;


  }
  showFoodInfosFunc(card: ICard){
    this.selectedCard = card;

    this.showFoodInfos = true;
    this.showPTag = false;
    this.showInputDiv = false;

    this.initForm();
  }
  showPTagFunc() {
    this.showPTag = true;
    this.showInputDiv = false;
    this.showFoodInfos = false;

    this.initForm();
  }

  get ingredients():any{
    return this.recipeForm.controls['ingredients'];
  }
  addIngredient(name:string,amount:number) {
    const ingredientForm = this.fb.group({
      name: [name,Validators.required],
      amount : [amount,[Validators.required,Validators.min(1)]]
    })
    this.ingredients.push(ingredientForm);
  }
  deleteIngredient(index:number){
    this.ingredients.removeAt(index);
  }

  getValueCustomDropdown(value: string) {
    this.parentValueFromChild = value;
    if (this.parentValueFromChild === "To Shop List"){
      this.toShopListBtn();
    }
    else if(this.parentValueFromChild === "Delete Recipe"){
      this.deleteRecipeBtn();
    }
    else if(this.parentValueFromChild === "Edit Recipe"){
      this.editRecipeBtn();
    }
  }
  toShopListBtn(){
    if (this.selectedCard?.ingredients !==undefined){
      for (let i = 0; i < this.selectedCard.ingredients.length;i++){
        this.ingredientService.saveIngredients(this.selectedCard.ingredients[i]);
      }
    }
  }

  deleteRecipeBtn(){
    if (this.selectedCard!==undefined){
      this.recipeService.deleteRecipe(this.selectedCard);
    }
    this.showPTagFunc();
    this.ngOnInit();
  }

  editRecipeBtn(){
    if (this.selectedCard!==undefined) {
      this.recipeForm.patchValue({
        name: this.selectedCard.name,
        description: this.selectedCard.description,
        imagePath: this.selectedCard.imagePath,
      });
      this.ingredients.clear();
      if (this.selectedCard.ingredients !== undefined){
        for (let i = 0; i < this.selectedCard.ingredients.length; i++) {
          this.addIngredient(this.selectedCard.ingredients[i].name, this.selectedCard.ingredients[i].amount);
        }
      }
    }
    this.showInputDivFunc();
  }
}
