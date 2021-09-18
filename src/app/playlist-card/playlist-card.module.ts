import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';
import { RouterModule } from '@angular/router';
import { DynamicColorModule } from '../dynamic-color/dynamicColor.module';

@NgModule({
  declarations: [
    PlaylistCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DynamicColorModule
  ],
  exports: [
    PlaylistCardComponent
  ]
})
export class PlaylistCardModule { }
