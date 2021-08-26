import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './authentication/logout/logout.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { BrowseComponent } from './categories/browse/browse.component';
import { CategoryPlaylistsComponent } from './category-playlists-full/category-playlists/category-playlists.component';
import { HomeComponent } from './home/home/home.component';
import { LibraryComponent } from './library/library/library.component';
import { SavedAlbumsComponent } from './library/saved-albums/saved-albums.component';
import { SavedArtistsComponent } from './library/saved-artists/saved-artists.component';
import { SavedPlaylistsComponent } from './library/saved-playlists/saved-playlists.component';
import { LikedSongsComponent } from './liked-songs/liked-songs/liked-songs.component';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs/playlist-songs.component';
import { PlaylistResolverService } from './services-singleton/resolvers/playlist-resolver.service';
import { RouteConstants } from './shared/constants/route-constants';

// TODO: Use resolvers
const routes: Routes = [
  { path: '', pathMatch: 'full' , component: HomeComponent },
  { path: `${RouteConstants.CATEGORY_PLAYLISTS_BASE}/:id`, component: CategoryPlaylistsComponent },
  // TODO: Move to constant
  { path: `categories`, component: BrowseComponent },
  { path: 'playlist/:id', component: PlaylistSongsComponent, resolve: { playlist: PlaylistResolverService } },
  { path: 'library', redirectTo: 'library/playlists' },
  { path: 'library', component: LibraryComponent, children: [
    { path: 'playlists', component: SavedPlaylistsComponent },
    { path: 'artists', component: SavedArtistsComponent },
    { path: 'albums', component: SavedAlbumsComponent }
  ] },
  { path: 'signin', component: SigninComponent },
  { path: 'liked', component: LikedSongsComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
