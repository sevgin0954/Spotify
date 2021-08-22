import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs.component';
import { SongsComponent } from './songs/songs.component';



@NgModule({
  declarations: [
    PlaylistSongsComponent,
    SongsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlaylistSongsModule { }
