import { Component, Input, OnChanges } from '@angular/core';
import { Paging } from 'src/app/models/paging/paging';
import { PlailistTrack } from 'src/app/models/plailist-track/plailist-track';
import { Track } from 'src/app/models/track/track';
import { AlbumService } from 'src/app/services-singleton/album.service';

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
        url: 'https://i1.sndcdn.com/avatars-000606604806-j6ghpm-t500x500.jpg',
        width: 500
      };
    })
  }

  loadMoreSongsCallback = () => {
    // this.albumService.getTracks(this.albumId, this.tracks.length, TRACKS_LIMIT).subscribe(data => {
    //   this.playlistTrack.items.push(...data.items);
    //   this.playlistTrack.next = data.next;
    //   this.playlistTrack.total = data.total;

    //   if (this.playlistTrack.next) {
    //     this.isLoadingDisabled = false;
    //   }
    //   else {
    //     this.isLoadingDisabled = true;
    //   }

    //   this.updateTracks();
    // });
  }

  updateTracks(): void {
    this.tracks = this.playlistTrack.items.filter(t => t !== null);
  }
}