import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsSectionComponent } from './components/playlists-section/playlists-section.component';
import { TextModule } from '../text/text.module';



@NgModule({
  declarations: [
    PlaylistsSectionComponent
  ],
  imports: [
    CommonModule,
    TextModule
  ],
  exports: [
    PlaylistsSectionComponent
  ]
})
export class PlaylistsModule { }
