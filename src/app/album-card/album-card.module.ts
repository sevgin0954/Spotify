import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from './album-card/album-card.component';
import { DynamicColorModule } from '../dynamic-color/dynamicColor.module';

@NgModule({
  declarations: [
    AlbumCardComponent
  ],
  imports: [
    CommonModule,
    DynamicColorModule
  ],
  exports: [
    AlbumCardComponent
  ]
})
export class AlbumCardModule { }
