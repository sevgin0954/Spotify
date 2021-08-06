import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFitComponent } from './text-fit/text-fit.component';
import { TextFitUnescapedComponent } from './text-fit-unescaped/text-fit-unescaped.component';

@NgModule({
  declarations: [
    TextFitComponent,
    TextFitUnescapedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextFitComponent,
    TextFitUnescapedComponent
  ]
})
export class TextModule { }
