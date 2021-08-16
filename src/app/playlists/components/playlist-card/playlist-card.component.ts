import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist/playlist';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistCardComponent {
  @Input()
  playlist: Playlist;

  @Input()
  descriptionDisplayRows: number = 2;

  @Input()
  titleDisplayRows: number = 2;
}
