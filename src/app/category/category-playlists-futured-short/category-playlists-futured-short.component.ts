import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { loadPlaylistsCallback } from 'src/app/playlists/types';
import { PlaylistService } from 'src/app/services-singleton/playlist-service';

@Component({
  selector: 'app-category-playlists-futured-short',
  templateUrl: './category-playlists-futured-short.component.html',
  styleUrls: ['./category-playlists-futured-short.component.scss', '../styles.scss']
})
export class CategoryPlaylistsFuturedShortComponent implements OnInit {
  loadPlaylistsCallback: loadPlaylistsCallback;

  private playlistLoadLimit = 10;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.loadPlaylistsCallback = () => {
      return this.playlistService.getFutured(this.playlistLoadLimit);
    }
  }
}
