import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/models/artist/artist';
import { ArtistService } from 'src/app/services-singleton/artist.service';

@Component({
  selector: 'app-artist-related-artists',
  templateUrl: './artist-related-artists.component.html',
  styleUrls: ['./artist-related-artists.component.scss']
})
export class ArtistRelatedArtistsComponent implements OnChanges {
  @Input()
  artistId: string;

  artists$: Observable<Artist[]>;

  constructor(
    private artistService: ArtistService
  ) { }

  ngOnChanges(): void {
    this.artists$ = this.artistService.getRelatedArtists(this.artistId);
  }
}