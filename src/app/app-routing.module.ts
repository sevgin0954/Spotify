import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './categories/browse/browse.component';
import { CategoryPlaylistsComponent } from './category/category-playlists/category-playlists.component';
import { HomeComponent } from './home/home/home.component';
import { RouteConstants } from './shared/constants/route-constants';

const routes: Routes = [
  { path: '', pathMatch: 'full' , component: HomeComponent },
  { path: `${RouteConstants.CATEGORY_PLAYLISTS_BASE}/:id`, component: CategoryPlaylistsComponent },
  { path: `categories`, component: BrowseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
