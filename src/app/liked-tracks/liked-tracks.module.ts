import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikedTracksComponent } from './liked-tracks/liked-tracks.component';
import { TrackModule } from '../track/track.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LikedTracksComponent }
];

@NgModule({
  declarations: [
    LikedTracksComponent
  ],
  imports: [
    CommonModule,
    TrackModule,
    RouterModule.forChild(routes)
  ]
})
export class LikedTracksModule { }