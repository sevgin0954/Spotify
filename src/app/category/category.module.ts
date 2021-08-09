import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPlaylistsShortComponent } from './category-playlists-short/category-playlists-short.component';
import { PlaylistsModule } from '../playlists/playlists.module';
import { CategoryPlaylistsFuturedShortComponent } from './category-playlists-futured-short/category-playlists-futured-short.component';
import { RouterModule } from '@angular/router';
import { CategoryPlaylistsComponent } from './category-playlists/category-playlists.component';

@NgModule({
  declarations: [
    CategoryPlaylistsShortComponent,
    CategoryPlaylistsFuturedShortComponent,
    CategoryPlaylistsComponent
  ],
  imports: [
    CommonModule,
    PlaylistsModule,
    RouterModule
  ],
  exports: [
    CategoryPlaylistsShortComponent,
    CategoryPlaylistsFuturedShortComponent
  ]
})
export class CategoryModule { }
