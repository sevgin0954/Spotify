import { Component, Input, OnChanges } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Track } from 'src/app/models/track/track';
import { ArtistService } from 'src/app/services-singleton/artist.service';
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
    private songService: SongService,
    private artistService: ArtistService
  ) { }

  ngOnChanges(): void {
    this.artistService.getTopTracks(this.artistId).pipe(
      switchMap(data => {
        this.tracks = data;

        const tracksIds = this.tracks.map(t => t.id);
        return this.songService.getLikedSongsByIds(tracksIds);
      })
    ).subscribe(data => {
      this.isTrackLiked = data;
    });
  }
}