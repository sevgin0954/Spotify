import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, pluck } from 'rxjs/operators';
import { Paging } from 'src/app/models/paging/paging';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistService } from 'src/app/services-singleton/playlist-service';
import { Category as CategoryEnum } from 'src/app/shared/enums/category';

const FUTURED_CATEGORY: string = 'futured';

@Component({
  selector: 'app-category-playlists',
  templateUrl: './category-playlists.component.html',
  styleUrls: ['./category-playlists.component.scss']
})
export class CategoryPlaylistsComponent implements OnInit {
  category: string = '';
  playlists$: Observable<Playlist[]>;
  // TODO: Create pagination
  private limit: number = 50;

  constructor(
    private playlistService: PlaylistService,
    private route: ActivatedRoute
  ) { }

  getCategoryName(category: string): string {
    return category.split('_').join(' ');
  }

  ngOnInit(): void {
    this.playlists$ = this.route.params.pipe(
      concatMap(params => {
        this.category = params['id'];

        if (this.category.toLowerCase() === FUTURED_CATEGORY) {
          return this.playlistService.getFutured(this.limit);
        }
        else {
          return this.playlistService.getByCategory(CategoryEnum[this.category], this.limit);
        }
      }),
      pluck<Paging<Playlist>, Playlist[]>('items')
    );
  }

}
