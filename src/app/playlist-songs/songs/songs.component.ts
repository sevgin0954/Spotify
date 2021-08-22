import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Paging } from 'src/app/models/paging/paging';
import { PlailistTrack } from 'src/app/models/plailist-track/plailist-track';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent {
  @Input()
  playlistTrack: Paging<PlailistTrack>;

  getDurationString(miliseconds: number): string {
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = Number.parseInt(((miliseconds % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}
