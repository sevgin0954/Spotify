import { Component, Input, OnChanges } from '@angular/core';
import { Paging } from 'src/app/models/paging/paging';
import { PlailistTrack } from 'src/app/models/plailist-track/plailist-track';
import { Track } from 'src/app/models/track/track';
import { LocalStorageService } from 'src/app/services-singleton/local-storage.service';
import { SongService } from 'src/app/services-singleton/song.service';

const PAGE_LIMIT = 50;

@Component({
  selector: 'app-playlist-tracks-body',
  templateUrl: './playlist-tracks-body.component.html',
  styleUrls: ['./playlist-tracks-body.component.scss']
})
// TODO: Rename to tracks or playlist-tracks-body
export class SongsComponent implements OnChanges {
  @Input()
  playlistTrack: Paging<PlailistTrack>;

  @Input()
  playlistId: string;

  isLoadingDisabled: boolean = true;
  loadMoreSongsCallback: Function;
  tracks: Track[];
  isTrackLiked: boolean[];

  private likedTracksStartIndex: number = 0;

  constructor(
    private songService: SongService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnChanges() {
    if (this.playlistTrack.next) {
      this.isLoadingDisabled = false;
    }

    this.initializeLoadMoreSongsCallback();
    this.updateTracks();
    this.initializeIsTrackLiked();
  }

  // TODO: Refactor
  private initializeIsTrackLiked(): void {
    if (this.isTrackLiked === undefined) {
      this.isTrackLiked = new Array(this.tracks.length);
    }

    this.isTrackLiked.length = this.tracks.length;

    const userToken = this.localStorageService.getUserToken();
    if (userToken) {
      for (let startIndex = this.likedTracksStartIndex; startIndex < this.tracks.length; startIndex+=50) {
        const endIndex = this.likedTracksStartIndex + 50 - 1;
  
        const currentPartTracks = this.tracks.slice(this.likedTracksStartIndex, endIndex);
        const currentPartTracksIds = currentPartTracks.map(t => t.id);
        this.songService.getLikedSongsByIds(currentPartTracksIds).subscribe(data => {
          this.likedTracksStartIndex += data.length;
          this.fillIsTrackLiked(startIndex, data);
        });
      }
    }
    else {
      this.isTrackLiked = this.isTrackLiked.fill(false);
    }
  }

  private fillIsTrackLiked(startIndex: number, values: boolean[]): void {
    let valuesIndex = 0;
    for (let i = startIndex; i < this.isTrackLiked.length; i++) {
      this.isTrackLiked[i] = values[valuesIndex];
      valuesIndex++;
    }

    this.isTrackLiked = [...this.isTrackLiked];
  }

  private initializeLoadMoreSongsCallback(): void {
    this.loadMoreSongsCallback = () => {
      return this.songService.getSongs(this.playlistId, PAGE_LIMIT, this.playlistTrack.items.length).pipe(
      ).subscribe(data => {
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
      });
    };
  }

  updateTracks(): void {
    this.tracks = this.playlistTrack.items.map(pt => pt.track).filter(t => t !== null);
  }
}