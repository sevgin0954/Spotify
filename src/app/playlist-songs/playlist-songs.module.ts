import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs.component';
import { SongsComponent } from './songs/songs.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PlaylistSongsComponent,
    SongsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PlaylistSongsModule { }
