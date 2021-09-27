import { Component, Input, OnChanges } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Track } from 'src/app/models/track/track';
import { GeolocationService } from 'src/app/services-singleton/geolocation.service';
import { TracksService } from 'src/app/services-singleton/tracks.service';
import { ArtistService } from '../services/artist.service';

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
    private songService: TracksService,
    private artistService: ArtistService,
    private geolocationService: GeolocationService
  ) { }

  ngOnChanges(): void {
    // Cache region code
    this.geolocationService.getRegionCode().pipe(
      switchMap(regionCode => {
        return this.artistService.getTopTracks(this.artistId, regionCode);
      }),
      switchMap(tracks => {
        this.tracks = tracks;

        const tracksIds = this.tracks.map(t => t.id);
        return this.songService.getLikedSongsByIds(tracksIds);
      })
    ).subscribe(data => {
      this.isTrackLiked = data;
    });
  }
}