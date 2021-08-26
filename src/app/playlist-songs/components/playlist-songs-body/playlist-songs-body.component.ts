import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Track } from 'src/app/models/track/track';

@Component({
  selector: 'app-playlist-songs-body',
  templateUrl: './playlist-songs-body.component.html',
  styleUrls: ['./playlist-songs-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistSongsBodyComponent {
  @Input()
  tracks: Track[];

  getDurationString(miliseconds: number): string {
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = Number.parseInt(((miliseconds % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}
