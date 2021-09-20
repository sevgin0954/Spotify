import { Component, Input, OnChanges } from '@angular/core';
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

  tracks: Track[] = [];
  isTrackLiked: boolean[] = [];

  constructor(
    private route: ActivatedRoute,
    private songService: SongService
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
}