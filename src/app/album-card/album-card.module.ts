import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from './album-card/album-card.component';
import { BoxShadowModule } from '../box-shadow/box-shadow.module';

@NgModule({
  declarations: [
    AlbumCardComponent
  ],
  imports: [
    CommonModule,
    BoxShadowModule
  ],
  exports: [
    AlbumCardComponent
  ]
})
export class AlbumCardModule { }
