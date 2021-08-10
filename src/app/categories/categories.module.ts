import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { CategoryComponent } from './components/category/category.component';



@NgModule({
  declarations: [
    BrowseComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BrowseComponent
  ]
})
export class CategoriesModule { }
