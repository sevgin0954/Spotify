import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistComponent } from './artist/artist.component';
import { SharedModule } from '../shared/shared.module';
import { ArtistTopTracksComponent } from './artist-top-tracks/artist-top-tracks.component';
import { TrackModule } from '../track/track.module';
import { ArtistAlbumsComponent } from './artist-albums-vertical/artist-albums-vertical.component';
import { AlbumCardModule } from '../album-card/album-card.module';
import { ExpandableListComponent } from './expandable-list/expandable-list.component';
import { ArtistHeaderComponent } from './artist-header/artist-header.component';
import { ArtistRelatedArtistsComponent } from './artist-related-artists/artist-related-artists.component';
import { ArtistCardModule } from '../artist-card/artist-card.module';
import { ArtistAlbumsHorizontalComponent } from './artist-albums-horizontal/artist-albums-horizontal.component';

@NgModule({
  declarations: [
    ArtistComponent,
    ArtistTopTracksComponent,
    ArtistAlbumsComponent,
    ExpandableListComponent,
    ArtistHeaderComponent,
    ArtistRelatedArtistsComponent,
    ArtistAlbumsHorizontalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TrackModule,
    AlbumCardModule,
    ArtistCardModule,
    SharedModule
  ]
})
export class ArtistModule { }
