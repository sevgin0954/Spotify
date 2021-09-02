import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Track } from 'src/app/models/track/track';
import { LocalStorageService } from 'src/app/services-singleton/local-storage.service';
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

  isTrackLiked: boolean[] = [];
  likedTracksStartIndex: number = 0;

  constructor(
    private songService: SongService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnChanges(): void {
    const userToken = this.localStorageService.getUserToken();
    // Checks if user is logged in
    if (userToken) {
      this.isTrackLiked.length = this.tracks.length;

      for (let startIndex = this.likedTracksStartIndex; startIndex < this.tracks.length; startIndex+=50) {
        const endIndex = this.likedTracksStartIndex + 50 - 1;
  
        const currentPartTracks = this.tracks.slice(this.likedTracksStartIndex, endIndex);
        const currentPartTracksIds = currentPartTracks.map(t => t.id);
        this.songService.getLikedSongsByIds(currentPartTracksIds).subscribe(data => {
          this.likedTracksStartIndex += data.length;
          this.fillIsTrackLiked(startIndex, data);
        });
      }
    }
  }

  fillIsTrackLiked(startIndex: number, values: boolean[]): void {
    let valuesIndex = 0;
    for (let i = startIndex; i < this.isTrackLiked.length; i++) {
      this.isTrackLiked[i] = values[valuesIndex];
      valuesIndex++;
    }
  }

  like(songIndex: number): void {
    this.songService.likeSong(this.tracks[songIndex].id).subscribe(() => {
      this.isTrackLiked[songIndex] = true;
    });
  }

  dislike(songIndex: number): void {
    this.songService.dislikeSong(this.tracks[songIndex].id).subscribe(() => {
      this.isTrackLiked[songIndex] = false;
    });
  }

  getDurationString(miliseconds: number): string {
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = Number.parseInt(((miliseconds % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}
