import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistTracksComponent } from './playlist-tracks/playlist-tracks.component';
import { SongsComponent } from './playlist-tracks-body/playlist-tracks-body.component';
import { SharedModule } from '../shared/shared.module';
import { PlaylistTracksHeaderComponent } from './playlist-tracks-header/playlist-tracks-header.component';
import { RouterModule, Routes } from '@angular/router';
import { TrackModule } from '../track/track.module';
import { DynamicColorModule } from '../dynamic-color/dynamicColor.module';

const routes: Routes = [
  { path: '', component: PlaylistTracksComponent }
];

@NgModule({
  declarations: [
    PlaylistTracksComponent,
    SongsComponent,
    PlaylistTracksHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    TrackModule,
    DynamicColorModule
  ]
})
export class PlaylistTracksModule { }
