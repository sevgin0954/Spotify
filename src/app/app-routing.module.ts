import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategyService } from './services-singleton/custom-preloading-strategy.service';
import { RouteConstants } from './shared/constants/route-constants';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { 
    path: `${RouteConstants.CATEGORY_PLAYLISTS_BASE}/:id`,
    loadChildren: () => import('./category-playlists-full/category-playlists-full.module').then(m => m.CategoryPlaylistsFullModule)
  },
  // TODO: Move to constant
  { 
    path: `categories`, 
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) 
  },
  { 
    path: 'playlist/:id', data: { preload: true },
    loadChildren: () => import('./playlist-tracks/playlist-tracks.module').then(m => m.PlaylistTracksModule) 
  },
  { path: 'library', redirectTo: 'library/playlists' },
  { 
    path: 'library', 
    loadChildren: () => import('./library/library.module').then(m => m.LibraryModule) 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  { 
    path: 'liked', 
    loadChildren: () => import('./liked-tracks/liked-tracks.module').then(m => m.LikedTracksModule) 
  },
  { 
    path: 'artist/:id', 
    loadChildren: () => import('./artist/artist.module').then(m => m.ArtistModule)
  },
  { 
    path: 'album/:id', 
    loadChildren: () => import('./album/album.module').then(m => m.AlbumModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategyService })],
  providers: [CustomPreloadingStrategyService],
  exports: [RouterModule]
})
export class AppRoutingModule { }