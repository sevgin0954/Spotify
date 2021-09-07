import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist/artist.component';
import { SharedModule } from '../shared/shared.module';
import { ArtistTopTracksComponent } from './artist-top-tracks/artist-top-tracks.component';
import { TrackModule } from '../track/track.module';

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistTopTracksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TrackModule
  ]
})
export class ArtistModule { }
