import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Playlist } from 'src/app/models/playlist/playlist';

@Component({
  selector: 'app-playlist-songs-header',
  templateUrl: './playlist-songs-header.component.html',
  styleUrls: ['./playlist-songs-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistSongsHeaderComponent {
  @Input()
  playlist: Playlist;
}
