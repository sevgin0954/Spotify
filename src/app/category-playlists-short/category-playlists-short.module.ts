import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPlaylistsShortComponent } from './category-playlists-short/category-playlists-short.component';
import { CategoryPlaylistsFuturedShortComponent } from './category-playlists-futured-short/category-playlists-futured-short.component';
import { SharedModule } from '../shared/shared.module';
import { PlaylistCardModule } from '../playlist-card/playlist-card.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CategoryPlaylistsShortComponent,
    CategoryPlaylistsFuturedShortComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlaylistCardModule,
    RouterModule
  ],
  exports: [
    CategoryPlaylistsShortComponent,
    CategoryPlaylistsFuturedShortComponent
  ]
})
export class CategoryPlaylistsShortModule { }
