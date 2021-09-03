import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikedSongsComponent } from './liked-songs/liked-songs.component';
import { TrackModule } from '../track/track.module';

@NgModule({
  declarations: [
    LikedSongsComponent
  ],
  imports: [
    CommonModule,
    TrackModule
  ]
})
export class LikedSongsModule { }
