import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent }
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CategoriesModule { }
