import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';
import { RouterModule } from '@angular/router';
import { BoxShadowModule } from '../box-shadow/box-shadow.module';

@NgModule({
  declarations: [
    PlaylistCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BoxShadowModule
  ],
  exports: [
    PlaylistCardComponent
  ]
})
export class PlaylistCardModule { }
