import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from './album-card/album-card.component';
import { DynamicColorModule } from '../dynamic-color/dynamicColor.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AlbumCardComponent
  ],
  imports: [
    CommonModule,
    DynamicColorModule,
    RouterModule
  ],
  exports: [
    AlbumCardComponent
  ]
})
export class AlbumCardModule { }
