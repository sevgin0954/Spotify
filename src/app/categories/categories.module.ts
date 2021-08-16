import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './browse/browse.component';
import { CategoryComponent } from './components/category/category.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BrowseComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BrowseComponent
  ]
})
export class CategoriesModule { }
