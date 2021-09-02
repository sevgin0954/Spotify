import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
import { PlaylistCardModule } from '../playlist-card/playlist-card.module';
import { RouterModule } from '@angular/router';
import { SavedPlaylistsComponent } from './saved-playlists/saved-playlists.component';
import { SharedModule } from '../shared/shared.module';
import { UserLibraryService } from './services/user-library.service';
import { SavedArtistsComponent } from './saved-artists/saved-artists.component';
import { SavedAlbumsComponent } from './saved-albums/saved-albums.component';
import { ArtistCardModule } from '../artist-card/artist-card.module';

@NgModule({
  declarations: [
    LibraryComponent,
    SavedPlaylistsComponent,
    SavedArtistsComponent,
    SavedAlbumsComponent
  ],
  imports: [
    CommonModule,
    PlaylistCardModule,
    RouterModule,
    SharedModule,
    ArtistCardModule
  ],
  providers: [
    UserLibraryService
  ]
})
export class LibraryModule { }