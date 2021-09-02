import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs.component';
import { SongsComponent } from './songs/songs.component';
import { SharedModule } from '../shared/shared.module';
import { PlaylistSongsHeaderComponent } from './playlist-songs-header/playlist-songs-header.component';
import { RouterModule } from '@angular/router';
import { TrackModule } from '../track/track.module';

@NgModule({
  declarations: [
    PlaylistSongsComponent,
    SongsComponent,
    PlaylistSongsHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TrackModule
  ]
})
export class PlaylistSongsModule { }
