import { Component, Input, OnChanges } from '@angular/core';
import { Paging } from 'src/app/models/paging/paging';
import { PlailistTrack } from 'src/app/models/plailist-track/plailist-track';
import { Track } from 'src/app/models/track/track';
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

  constructor(
    private songService: SongService
  ) { }

  ngOnChanges() {
    if (this.playlistTrack.next) {
      this.isLoadingDisabled = false;
    }

    this.initializeLoadMoreSongsCallback();
    this.updateTracks();
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