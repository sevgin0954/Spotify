import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';
import { TextModule } from '../text/text.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PlaylistCardComponent
  ],
  imports: [
    CommonModule,
    TextModule,
    RouterModule
  ],
  exports: [
    PlaylistCardComponent
  ]
})
export class PlaylistCardModule { }
