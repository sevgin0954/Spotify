import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundColorDominantDirective } from './directives/background-color-dominant.directive';
import { BoxShadowColorLightestDirective } from './directives/box-shadow-color-lightest.directive';
import { ColorService } from './services/color.service';
import { BoxShadowColorDominantDirective } from './directives/box-shadow-color-dominant.directive';

@NgModule({
  declarations: [
    BackgroundColorDominantDirective,
    BoxShadowColorLightestDirective,
    BoxShadowColorDominantDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ColorService
  ],
  exports: [
    BackgroundColorDominantDirective,
    BoxShadowColorLightestDirective,
    BoxShadowColorDominantDirective
  ]
})
export class DynamicColorModule { }
