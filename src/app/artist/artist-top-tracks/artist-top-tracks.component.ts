import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Track } from 'src/app/models/track/track';
import { SongService } from 'src/app/services-singleton/song.service';

@Component({
  selector: 'app-artist-top-tracks',
  templateUrl: './artist-top-tracks.component.html',
  styleUrls: ['./artist-top-tracks.component.scss']
})
export class ArtistTopTracksComponent implements OnChanges {
  @Input()
  artistId: string;

  @ViewChild('tracksContainer')
  tracksContainer: ElementRef;

  @ViewChild('showTracksButton')
  showTracksButton: ElementRef;

  @ViewChild('hideTracksButton')
  hideTracksButton: ElementRef;

  tracks: Track[] = [];
  isTrackLiked: boolean[] = [];

  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private renderer2: Renderer2
  ) { }

  ngOnChanges(): void {
    this.route.data.pipe(
      switchMap(data => {
        this.tracks = data['tracks'];
        
        const tracksIds = this.tracks.map(t => t.id);
        return this.songService.getLikedSongsByIds(tracksIds);
      })
    ).subscribe(data => {
      this.isTrackLiked = data;
    });
  }

  onShowAllTracks(): void {
    this.renderer2.setStyle(this.tracksContainer.nativeElement, 'height', 'fit-content');
    this.renderer2.setStyle(this.showTracksButton.nativeElement, 'display', 'none');
    this.renderer2.setStyle(this.hideTracksButton.nativeElement, 'display', 'block');
  }

  onHideTracks(): void {
    this.renderer2.removeStyle(this.tracksContainer.nativeElement, 'height');
    this.renderer2.setStyle(this.hideTracksButton.nativeElement, 'display', 'none');
    this.renderer2.setStyle(this.showTracksButton.nativeElement, 'display', 'block');
  }
}
