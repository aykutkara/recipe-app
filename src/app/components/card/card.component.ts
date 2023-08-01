import {Component, Input} from '@angular/core';
import {ICard} from "../../interfaces/card.interface";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  // @ts-ignore
  @Input() data: ICard;
  // @ts-ignore
  @Input() isActive:Boolean;
}
