import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { DynamicColorModule } from '../dynamic-color/dynamicColor.module';
import { AlbumHeaderComponent } from './album-header/album-header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AlbumTracksBodyComponent } from './album-tracks-body/album-tracks-body.component';
import { TrackModule } from '../track/track.module';

const routes: Routes = [
  { path: '', component: AlbumComponent }
];

@NgModule({
  declarations: [
    AlbumComponent,
    AlbumHeaderComponent,
    AlbumTracksBodyComponent
  ],
  imports: [
    CommonModule,
    DynamicColorModule,
    SharedModule,
    RouterModule.forChild(routes),
    TrackModule
  ]
})
export class AlbumModule { }