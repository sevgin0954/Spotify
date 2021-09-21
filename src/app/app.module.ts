import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services-singleton/interceptors/jwt-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { CategoryPlaylistsFullModule } from './category-playlists-full/category-playlists-full.module';
import { LibraryModule } from './library/library.module';
import { LikedSongsModule } from './liked-songs/liked-songs.module';
import { ArtistModule } from './artist/artist.module';
import { PlaylistTracksModule } from './playlist-tracks/playlist-tracks.module';
import { AlbumModule } from './album/album.module';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    HomeModule,
    NavbarModule,
    CategoryPlaylistsFullModule,
    PlaylistTracksModule,
    LibraryModule,
    LikedSongsModule,
    ArtistModule,
    AlbumModule,
    AuthenticationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
