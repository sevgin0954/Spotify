import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';
import { RouteConstants } from 'src/app/shared/constants/route-constants';

@Component({
  selector: 'app-category-playlists-futured-short',
  templateUrl: './category-playlists-futured-short.component.html',
  styleUrls: ['./category-playlists-futured-short.component.scss', '../styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPlaylistsFuturedShortComponent implements OnInit {

  playlistsRoute: string = `/${RouteConstants.CATEGORY_PLAYLISTS_BASE}/futured`;
  playlists$: Observable<Playlist[]>;

  private playlistLoadLimit = 10;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.playlists$ = this.playlistService.getFutured(this.playlistLoadLimit, 0).pipe(
      pluck('items')
    );
  }
}
