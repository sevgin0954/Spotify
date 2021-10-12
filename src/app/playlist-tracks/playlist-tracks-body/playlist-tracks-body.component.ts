import { Component, Input, OnChanges } from '@angular/core';
import { Image } from 'src/app/models/image/image';
import { Paging } from 'src/app/models/paging/paging';
import { PlailistTrack } from 'src/app/models/plailist-track/plailist-track';
import { Track } from 'src/app/models/track/track';
import { TracksService } from 'src/app/services-singleton/tracks.service';
import { RouteConstants } from 'src/app/shared/constants/route-constants';
import { PageArguments } from 'src/app/shared/page-arguments';

const PAGE_LIMIT = 50;

@Component({
  selector: 'app-playlist-tracks-body',
  templateUrl: './playlist-tracks-body.component.html',
  styleUrls: ['./playlist-tracks-body.component.scss']
})
export class PlaylistTracksBody implements OnChanges {
  @Input()
  playlistTrack: Paging<PlailistTrack>;

  @Input()
  playlistId: string;

  isLoadingDisabled: boolean = true;
  isCurrentlyLoading = false;
  tracks: Track[] = [];

  constructor(
    private songService: TracksService
  ) { }

  ngOnChanges() {
    if (this.playlistTrack.next) {
      this.isLoadingDisabled = false;
    }

    this.updateTracks();
  }

  loadMoreSongsCallback = () => {
    this.isCurrentlyLoading = true;

    const pageArgs = new PageArguments(PAGE_LIMIT, this.playlistTrack.items.length);

    this.songService.getSongs(this.playlistId, pageArgs).subscribe(data => {
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
    this.tracks = this.playlistTrack.items.map(pt => pt.track).filter(t => t !== null && t.id !== null);

    this.addDefaultImageIfNecessary();
  }

  private addDefaultImageIfNecessary(): void {
    this.tracks.forEach(t => {
      const albumImages = t.album.images;
      if (albumImages.length === 0) {
        const image: Image = {
          url: RouteConstants.DEFAULT_ALBUM_ICON,
          height: 500,
          width: 500
        };
        albumImages.push(image);
      }
    });
  }
}