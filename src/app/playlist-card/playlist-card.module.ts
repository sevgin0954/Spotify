import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PlaylistCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PlaylistCardComponent
  ]
})
export class PlaylistCardModule { }
