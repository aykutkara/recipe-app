import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IDropdown} from "../../interfaces/dropdown.interface";

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent{
  isDropdownOpen = false;

  constructor() {
  }

  @Input() data:IDropdown[] =[];
  @Output() valueToParent = new EventEmitter<string>();
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  handleOptionClick(option: string) {
    if (option === "To Shop List"){
      this.valueToParent.emit("To Shop List");
    }
    else if(option === "Edit Recipe"){
      this.valueToParent.emit("Edit Recipe");
    }
    else if (option === "Delete Recipe"){
      this.valueToParent.emit("Delete Recipe");
    }
  }



}
