import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxShadowColoredComponent } from './box-shadow-colored/box-shadow-colored.component';

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
