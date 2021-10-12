import { Component, Input, OnChanges } from '@angular/core';
import { Paging } from 'src/app/models/paging/paging';
import { Track } from 'src/app/models/track/track';
import { RouteConstants } from 'src/app/shared/constants/route-constants';
import { PageArguments } from 'src/app/shared/page-arguments';
import { AlbumService } from '../services/album.service';

const TRACKS_LIMIT = 50;

@Component({
  selector: 'app-album-tracks-body',
  templateUrl: './album-tracks-body.component.html',
  styleUrls: ['./album-tracks-body.component.scss']
})
export class AlbumTracksBodyComponent implements OnChanges {

  @Input()
  playlistTrack: Paging<Track>;

  @Input()
  albumId: string;

  tracks: Track[] = [];
  isLoadingDisabled: boolean = true;
  isCurrentlyLoading: boolean = false;

  constructor(
    private albumService: AlbumService
  ) { }

  ngOnChanges(): void {
    if (this.playlistTrack.next) {
      this.isLoadingDisabled = false;
    }
    
    this.updateTracks();
    
    
    this.tracks.forEach(t => {
      t.album = {
        images: [],
        album_group: '',
        album_type: '',
        artists: [],
        available_markets: [],
        href: '',
        id: '',
        name: '',
        popularity: -1,
        release_date: '1998',
        release_date_precision: '',
        total_tracks: -1,
        tracks: {
          href: '',
          items: [],
          limit: -1,
          next: '',
          offset: -1,
          previous: '',
          total: -1
        },
        type: '',
        uri: ''
      };
      t.album.images[0] = {
        height: 500,
        url: RouteConstants.DEFAULT_ALBUM_ICON,
        width: 500
      };
    })
  }

  loadMoreSongsCallback = () => {
    this.isCurrentlyLoading = true;

    const pageArgs = new PageArguments(TRACKS_LIMIT, this.tracks.length);
    this.albumService.getTracks(this.albumId, pageArgs).subscribe(data => {
      this.playlistTrack.items.push(...data.items);
      this.playlistTrack.next = data.next;
      this.playlistTrack.total = data.total;

      if (this.playlistTrack.next) {
        this.isLoadingDisabled = false;
      }
      else {
        this.isLoadingDisabled = true;
      }

      this.updateTracks();

      this.isCurrentlyLoading = false;
    });
  }

  updateTracks(): void {
    this.tracks = this.playlistTrack.items.filter(t => t !== null);
  }
}