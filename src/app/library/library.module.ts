import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
import { PlaylistCardModule } from '../playlist-card/playlist-card.module';
import { RouterModule } from '@angular/router';
import { SavedPlaylistsComponent } from './saved-playlists/saved-playlists.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LibraryComponent,
    SavedPlaylistsComponent
  ],
  imports: [
    CommonModule,
    PlaylistCardModule,
    RouterModule,
    SharedModule
  ]
})
export class LibraryModule { }
