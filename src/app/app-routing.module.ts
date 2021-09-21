import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album/album.component';
import { ArtistComponent } from './artist/artist/artist.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { CategoryPlaylistsComponent } from './category-playlists-full/category-playlists/category-playlists.component';
import { HomeComponent } from './home/home/home.component';
import { LibraryComponent } from './library/library/library.component';
import { SavedAlbumsComponent } from './library/saved-albums/saved-albums.component';
import { SavedArtistsComponent } from './library/saved-artists/saved-artists.component';
import { SavedPlaylistsComponent } from './library/saved-playlists/saved-playlists.component';
import { LikedSongsComponent } from './liked-songs/liked-songs/liked-songs.component';
import { PlaylistTracksComponent } from './playlist-tracks/playlist-tracks/playlist-tracks.component';
import { ArtistResolver } from './services-singleton/resolvers/artist-resolver.service';
import { ArtistTopTracksResolver } from './services-singleton/resolvers/artist-top-tracks.service';
import { PlaylistResolverService } from './services-singleton/resolvers/playlist-resolver.service';
import { RouteConstants } from './shared/constants/route-constants';

const routes: Routes = [
  { path: '', pathMatch: 'full' , component: HomeComponent },
  { path: `${RouteConstants.CATEGORY_PLAYLISTS_BASE}/:id`, component: CategoryPlaylistsComponent },
  // TODO: Move to constant
  { path: `categories`, loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: 'playlist/:id', component: PlaylistTracksComponent, resolve: { playlist: PlaylistResolverService } },
  { path: 'library', redirectTo: 'library/playlists' },
  { path: 'library', component: LibraryComponent, children: [
    { path: 'playlists', component: SavedPlaylistsComponent },
    { path: 'artists', component: SavedArtistsComponent },
    { path: 'albums', component: SavedAlbumsComponent }
  ] },
  { path: 'signin', component: SigninComponent },
  { path: 'liked', component: LikedSongsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'artist/:id', component: ArtistComponent, resolve: { artist: ArtistResolver, tracks: ArtistTopTracksResolver } },
  { path: 'album/:id', component: AlbumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }