import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, pluck, tap } from 'rxjs/operators';
import { Paging } from 'src/app/models/paging/paging';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';
import { Category as CategoryEnum } from 'src/app/shared/enums/category';

const FUTURED_CATEGORY: string = 'futured';
const PAGE_LIMIT: number = 50;

@Component({
  selector: 'app-category-playlists',
  templateUrl: './category-playlists.component.html',
  styleUrls: ['./category-playlists.component.scss']
})
export class CategoryPlaylistsComponent {
  category: string = '';
  isLoadingDisabled: boolean = true;
  playlists: Playlist[] = [];

  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute
  ) { }

  getCategoryName(category: string): string {
    return category.split('_').join(' ');
  }

  ngOnInit(): void {
    this.loadMorePlaylists();
  }

  loadMorePlaylists = () => {
    this.route.params.pipe(
      concatMap(params => {
        this.category = params['id'];

        if (this.category.toLowerCase() === FUTURED_CATEGORY) {
          return this.playlistService.getFutured(PAGE_LIMIT, this.playlists.length);
        }
        else {
          return this.playlistService.getByCategory(CategoryEnum[this.category], PAGE_LIMIT, this.playlists.length);
        }
      }),
      tap(data => {
        if (data.next) {
          this.isLoadingDisabled = false;
        }
        else {
          this.isLoadingDisabled = true;
        }
      }),
      pluck<Paging<Playlist>, Playlist[]>('items')
    ).subscribe(playlists => {
      this.playlists.push(...playlists);
    });
  }
}
