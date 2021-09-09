import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist/artist.component';
import { SharedModule } from '../shared/shared.module';
import { ArtistTopTracksComponent } from './artist-top-tracks/artist-top-tracks.component';
import { TrackModule } from '../track/track.module';
import { ArtistAlbumsComponent } from './artist-albums/artist-albums.component';
import { AlbumCardModule } from '../album-card/album-card.module';
import { ExpandableListComponent } from './expandable-list/expandable-list.component';
import { ArtistHeaderComponent } from './artist-header/artist-header.component';

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistTopTracksComponent,
    ArtistAlbumsComponent,
    ExpandableListComponent,
    ArtistHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TrackModule,
    AlbumCardModule
  ]
})
export class ArtistModule { }
