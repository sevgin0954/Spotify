import { Component, OnInit } from '@angular/core';
import { loadPlaylistsCallback } from 'src/app/playlists/types';
import { PlaylistService } from 'src/app/services-singleton/playlist-service';
import { RouteConstants } from 'src/app/shared/constants/route-constants';

@Component({
  selector: 'app-category-playlists-futured-short',
  templateUrl: './category-playlists-futured-short.component.html',
  styleUrls: ['./category-playlists-futured-short.component.scss', '../styles.scss']
})
export class CategoryPlaylistsFuturedShortComponent implements OnInit {
  loadPlaylistsCallback: loadPlaylistsCallback;
  playlistsRoute: string = `${RouteConstants.CATEGORY_PLAYLISTS_BASE}/futured`;

  private playlistLoadLimit = 10;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.loadPlaylistsCallback = () => {
      return this.playlistService.getFutured(this.playlistLoadLimit);
    }
  }
}
