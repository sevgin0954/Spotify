import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/models/playlist/playlist';

@Component({
  selector: 'app-category-playlist-basic',
  templateUrl: './category-playlist-basic.component.html',
  styleUrls: ['./category-playlist-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPlaylistBasicComponent {
  @Input()
  title: string;

  @Input()
  playlistsRoute: string;

  @Input()
  playlists$: Observable<Playlist[]>
}
