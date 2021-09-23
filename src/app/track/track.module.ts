import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TracksTableComponent } from './tracks-table/tracks-table.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TracksWithLikesTableComponent } from './tracks-with-likes-table/tracks-with-likes-table.component';
import { TracksWithLikesTableShortComponent } from './tracks-with-likes-table-short/tracks-with-likes-table-short.component';
import { TracksDisplayService } from './services/tracks-display.service';
import { TracksTableShortComponent } from './tracks-table-short/tracks-table-short.component';
import { DisplayService } from './services/display.service';

@NgModule({
  declarations: [
    TracksTableComponent,
    TracksWithLikesTableComponent,
    TracksWithLikesTableShortComponent,
    TracksTableShortComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: [
    TracksDisplayService,
    DisplayService
  ],
  exports: [
    TracksTableComponent,
    TracksWithLikesTableComponent,
    TracksWithLikesTableShortComponent,
    TracksTableShortComponent
  ]
})
export class TrackModule { }