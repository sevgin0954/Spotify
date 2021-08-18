import { NgModule } from '@angular/core';
import { CategoryPlaylistsComponent } from './category-playlists/category-playlists.component';
import { PlaylistCardModule } from '../playlist-card/playlist-card.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CategoryPlaylistsComponent
  ],
  imports: [
    PlaylistCardModule,
    SharedModule,
    CommonModule
  ],
  exports: [
    CategoryPlaylistsComponent
  ]
})
export class CategoryPlaylistsFullModule { }
