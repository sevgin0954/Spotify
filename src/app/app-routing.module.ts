import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './categories/browse/browse.component';
import { CategoryPlaylistsComponent } from './category-playlists-full/category-playlists/category-playlists.component';
import { HomeComponent } from './home/home/home.component';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs/playlist-songs.component';
import { PlaylistResolverService } from './services-singleton/resolvers/playlist-resolver.service';
import { RouteConstants } from './shared/constants/route-constants';

const routes: Routes = [
  { path: '', pathMatch: 'full' , component: HomeComponent },
  { path: `${RouteConstants.CATEGORY_PLAYLISTS_BASE}/:id`, component: CategoryPlaylistsComponent },
  // TODO: Move to constant
  { path: `categories`, component: BrowseComponent },
  { path: 'playlist/:id', component: PlaylistSongsComponent, resolve: { playlist: PlaylistResolverService } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
