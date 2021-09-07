import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksTableComponent } from './tracks-table/tracks-table.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TracksTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    TracksTableComponent
  ]
})
export class TrackModule { }
