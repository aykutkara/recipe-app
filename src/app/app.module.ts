import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { RouterLink, RouterModule, Routes} from "@angular/router";
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import {SummaryPipe} from "./pipes/summary.pipe";

const routes:Routes = [
  {path: 'recipes', component: RecipesComponent},
  {path: '', component: RecipesComponent},
  {path: 'shopping-list', component: ShoppingListComponent}
]
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        RecipesComponent,
        ShoppingListComponent,
        ListComponent,
        CardComponent,
        CustomDropdownComponent,
        SummaryPipe,
    ],
    imports: [
        BrowserModule,
        RouterLink,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
