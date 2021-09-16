import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxShadowColoredComponent } from './box-shadow-dynamic-colored/box-shadow-dynamic-colored.component';

@NgModule({
  declarations: [
    BoxShadowColoredComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoxShadowColoredComponent
  ]
})
export class BoxShadowModule { }
