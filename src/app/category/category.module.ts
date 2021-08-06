import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPlaylistsShortComponent } from './category-playlists-short/category-playlists-short.component';
import { PlaylistsModule } from '../playlists/playlists.module';
import { CategoryPlaylistsFuturedShortComponent } from './category-playlists-futured-short/category-playlists-futured-short.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CategoryPlaylistsShortComponent,
    CategoryPlaylistsFuturedShortComponent
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
