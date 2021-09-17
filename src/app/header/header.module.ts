import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundColorDynamicDirective } from './background-color-dynamic.directive';
import { BoxShadowColorDynamicDirective } from './box-shadow-color-dynamic.directive';



@NgModule({
  declarations: [
    BackgroundColorDynamicDirective,
    BoxShadowColorDynamicDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BackgroundColorDynamicDirective,
    BoxShadowColorDynamicDirective
  ]
})
export class HeaderModule { }
