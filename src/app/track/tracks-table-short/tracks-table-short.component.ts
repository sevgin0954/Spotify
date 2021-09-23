import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Track } from 'src/app/models/track/track';
import { TracksService } from 'src/app/services-singleton/tracks.service';
import { DisplayService } from '../services/display.service';

@Component({
  selector: 'app-tracks-table-short',
  templateUrl: './tracks-table-short.component.html',
  styleUrls: ['./tracks-table-short.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TracksTableShortComponent {
  @Input()
  tracks: Track[];

  @Input()
  isTrackLiked: boolean[];

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
}
