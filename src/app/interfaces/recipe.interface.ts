import {Iingredients} from "./ingredients.interface";

export interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients?: Iingredients[];
}
