import {Component, Input} from '@angular/core';
import {Iingredients} from "../../interfaces/ingredients.interface";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  @Input() value: Iingredients = {"name":"","amount":0};
}
