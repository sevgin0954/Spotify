import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikedSongsComponent } from './liked-songs/liked-songs.component';
import { PlaylistSongsModule } from '../playlist-songs/playlist-songs.module';

@NgModule({
  declarations: [
    LikedSongsComponent
  ],
  imports: [
    CommonModule,
    PlaylistSongsModule
  ]
})
export class LikedSongsModule { }
