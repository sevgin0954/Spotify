import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Playlist } from '../../../models/playlist/playlist';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistCardComponent implements AfterViewInit {
  @Input()
  playlist: Playlist;

  @ViewChild('description')
  description: ElementRef;

  ngAfterViewInit(): void {
    const child = this.description.nativeElement.children[0];
    if (child) {
      this.description.nativeElement.children[0].setAttribute('style', `color: white; text-decoration: underline;`);
    }
  }
}