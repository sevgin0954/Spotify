import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';
import { TextModule } from '../text/text.module';

@NgModule({
  declarations: [
    PlaylistCardComponent
  ],
  imports: [
    CommonModule,
    TextModule
  ],
  exports: [
    PlaylistCardComponent
  ]
})
export class PlaylistCardModule { }
