import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Track } from 'src/app/models/track/track';
import { SongService } from 'src/app/services-singleton/song.service';

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

  constructor(
    private songService: SongService,
    private changeDetectionRef: ChangeDetectorRef
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
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = Number.parseInt(((miliseconds % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}
