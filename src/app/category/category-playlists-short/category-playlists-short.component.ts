import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { loadPlaylistsCallback } from 'src/app/playlists/types';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';
import { RouteConstants } from 'src/app/shared/constants/route-constants';
import { Category as CategoryEnum } from 'src/app/shared/enums/category';

@Component({
  selector: 'app-category-playlists-short',
  templateUrl: './category-playlists-short.component.html',
  styleUrls: ['./category-playlists-short.component.scss', '../styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPlaylistsShortComponent implements OnInit, OnChanges {
  @Input()
  category: CategoryEnum

  playlistsRoute: string;
  loadPlaylistsCallbacks: loadPlaylistsCallback;

  private playlistLoadLimit = 10;

  constructor(private playlistService: PlaylistService) { }

  getCategoryName(category: CategoryEnum): string {
    const categoryName = CategoryEnum[category].split('_').join(' ');
    return categoryName;
  }

  ngOnInit(): void {
    this.playlistsRoute = `/${RouteConstants.CATEGORY_PLAYLISTS_BASE}/${CategoryEnum[this.category]}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPlaylistsCallbacks = () => {
      return this.playlistService.getByCategory(this.category, this.playlistLoadLimit, 0);
    };
  }
}
