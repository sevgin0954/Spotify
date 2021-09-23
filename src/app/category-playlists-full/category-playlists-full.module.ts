import { NgModule } from '@angular/core';
import { CategoryPlaylistsComponent } from './category-playlists/category-playlists.component';
import { PlaylistCardModule } from '../playlist-card/playlist-card.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CategoryPlaylistsComponent }
];

@NgModule({
  declarations: [
    CategoryPlaylistsComponent
  ],
  imports: [
    PlaylistCardModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CategoryPlaylistsComponent
  ]
})
export class CategoryPlaylistsFullModule { }
