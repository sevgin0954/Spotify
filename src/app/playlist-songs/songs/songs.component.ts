import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Paging } from 'src/app/models/paging/paging';
import { PlailistTrack } from 'src/app/models/plailist-track/plailist-track';
import { Track } from 'src/app/models/track/track';
import { SongService } from 'src/app/services-singleton/song.service';

const PAGE_LIMIT = 50;

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  @Input()
  playlistTrack: Paging<PlailistTrack>;

  @Input()
  playlistId: string;

  isLoadingDisabled: boolean = true;
  loadMoreSongsCallback: Function;

  constructor(
    private songService: SongService
  ) { }

  ngOnInit(): void {
    if (this.playlistTrack.next) {
      this.isLoadingDisabled = false;
    }

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
      });
    };
  }

  getDurationString(miliseconds: number): string {
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = Number.parseInt(((miliseconds % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}
