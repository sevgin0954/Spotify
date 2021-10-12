import { Component, Input, OnChanges } from '@angular/core';
import { Track } from 'src/app/models/track/track';
import { TracksDisplayService } from '../services/tracks-display.service';
import { isTracksLikedPage } from '../types';

@Component({
  selector: 'app-tracks-with-likes-table',
  templateUrl: './tracks-with-likes-table.component.html',
  styleUrls: ['./tracks-with-likes-table.component.scss']
})
export class TracksWithLikesTableComponent implements OnChanges {

  @Input()
  tracks: Track[];

  isTrackLikedLoaded: boolean[] = [];

  private isTrackLikedPages: isTracksLikedPage[] = [];
  private isTrackLikedCurrentPage: number = 1;

  constructor(
    private tracksDisplayService: TracksDisplayService
  ) { }

  ngOnChanges(): void {
    this.tracksDisplayService.getIsTrackLiked(this.tracks).subscribe(data => {
      this.isTrackLikedPages.push(data);

      this.isTrackLikedCurrentPage = this.tracksDisplayService
        .tryMoveLoadedTrackLiked(this.isTrackLikedLoaded, this.isTrackLikedPages, this.isTrackLikedCurrentPage);
      this.isTrackLikedLoaded = [...this.isTrackLikedLoaded];
    });
  }
}