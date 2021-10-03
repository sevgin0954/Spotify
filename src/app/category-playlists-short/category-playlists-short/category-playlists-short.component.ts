import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';
import { RouteConstants } from 'src/app/shared/constants/route-constants';
import { Category as CategoryEnum } from 'src/app/shared/enums/category';
import { PageArguments } from 'src/app/shared/page-arguments';

const PLAYLIST_LIMIT = 10;

@Component({
  selector: 'app-category-playlists-short',
  templateUrl: './category-playlists-short.component.html',
  styleUrls: ['./category-playlists-short.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPlaylistsShortComponent implements OnInit, OnChanges {
  @Input()
  category: CategoryEnum

  playlistsRoute: string;
  playlists$: Observable<Playlist[]>;

  constructor(private playlistService: PlaylistService) { }

  getCategoryName(category: CategoryEnum): string {
    const categoryName = CategoryEnum[category].split('_').join(' ');
    return categoryName;
  }

  ngOnInit(): void {
    this.playlistsRoute = `/${RouteConstants.CATEGORY_PLAYLISTS_BASE}/${CategoryEnum[this.category]}`;
  }

  ngOnChanges(): void {
    const pageArgs = new PageArguments(PLAYLIST_LIMIT);
    this.playlists$ = this.playlistService.getByCategory(this.category, pageArgs).pipe(
      pluck('items')
    );
  }
}
