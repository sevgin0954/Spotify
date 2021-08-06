import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { loadPlaylistsCallback } from 'src/app/playlists/types';
import { PlaylistService } from 'src/app/services-singleton/playlist-service';
import { Category as CategoryEnum } from 'src/app/shared/enums/category';

@Component({
  selector: 'app-category-playlists-short',
  templateUrl: './category-playlists-short.component.html',
  styleUrls: ['./category-playlists-short.component.scss', '../styles.scss']
})
export class CategoryPlaylistsShortComponent implements OnChanges {
  @Input()
  category: CategoryEnum

  loadPlaylistsCallbacks: loadPlaylistsCallback;

  private playlistLoadLimit = 10;

  constructor(private playlistService: PlaylistService) { }

  getCategoryName(category: CategoryEnum): string {
    const categoryName = CategoryEnum[category].split('_').join(' ');
    return categoryName;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPlaylistsCallbacks = () => {
      return this.playlistService.getByCategory(this.category, this.playlistLoadLimit);
    };
  }
}
