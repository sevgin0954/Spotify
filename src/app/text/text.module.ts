import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFitComponent } from './text-fit/text-fit.component';



@NgModule({
  declarations: [
    TextFitComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextFitComponent
  ]
})
export class TextModule { }
