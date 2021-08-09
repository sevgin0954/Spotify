import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsSectionComponent } from './playlists-section/playlists-section.component';
import { TextModule } from '../text/text.module';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';



@NgModule({
  declarations: [
    PlaylistsSectionComponent,
    PlaylistCardComponent
  ],
  imports: [
    CommonModule,
    TextModule
  ],
  exports: [
    PlaylistsSectionComponent,
    PlaylistCardComponent
  ]
})
export class PlaylistsModule { }
