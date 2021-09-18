import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistTracksComponent } from './playlist-tracks/playlist-tracks.component';
import { SongsComponent } from './playlist-tracks-body/playlist-tracks-body.component';
import { SharedModule } from '../shared/shared.module';
import { PlaylistTracksHeaderComponent } from './playlist-tracks-header/playlist-tracks-header.component';
import { RouterModule } from '@angular/router';
import { TrackModule } from '../track/track.module';
import { DynamicColorModule } from '../dynamic-color/dynamicColor.module';

@NgModule({
  declarations: [
    PlaylistTracksComponent,
    SongsComponent,
    PlaylistTracksHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TrackModule,
    DynamicColorModule
  ]
})
export class PlaylistTracksModule { }
