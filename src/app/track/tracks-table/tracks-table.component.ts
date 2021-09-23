import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Track } from 'src/app/models/track/track';
import { TracksService } from 'src/app/services-singleton/tracks.service';
import { DisplayService } from '../services/display.service';

@Component({
  selector: 'app-tracks-table',
  templateUrl: './tracks-table.component.html',
  styleUrls: ['./tracks-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TracksTableComponent {
  @Input()
  tracks: Track[];

  @Input()
  isTrackLiked: boolean[];
  
  releasedDateSeparator = '-';

  constructor(
    private songService: TracksService,
    private changeDetectionRef: ChangeDetectorRef,
    private displayService: DisplayService
  ) { }

  like(songIndex: number): void {
    this.songService.likeSong(this.tracks[songIndex].id).subscribe(() => {
      this.isTrackLiked[songIndex] = true;

      this.changeDetectionRef.detectChanges();
    });
  }

  dislike(songIndex: number): void {
    this.songService.dislikeSong(this.tracks[songIndex].id).subscribe(() => {
      this.isTrackLiked[songIndex] = false;

      this.changeDetectionRef.detectChanges();
    });
  }

  getDurationString(miliseconds: number): string {
    return this.displayService.getDurationString(miliseconds);
  }

  getReleasedYear(songIndex: number): string {
    return this.displayService.getReleasedYear(songIndex, this.tracks, this.releasedDateSeparator);
  }

  getReleasedMonthAndDate(songIndex: number): string {
    return this.displayService.getReleasedMonthAndDate(songIndex, this.tracks, this.releasedDateSeparator);
  }
}
