import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { Artist } from 'src/app/models/artist/artist';
import { FallowArtistService } from 'src/app/services-singleton/fallow-artist.service';
import { ArtistService } from '../../services-singleton/artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  isUserFallowing: boolean;
  artist: Artist;

  constructor(
    private route: ActivatedRoute,
    private fallowArtistService: FallowArtistService
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(
      concatMap(params => {
        this.artist = params['artist'];
        return this.fallowArtistService.checkIfCurrentUserIsFallowing(this.artist.id);
      })
    ).subscribe(data => {
      this.isUserFallowing = data;
    });
  }

  fallow() {
    this.fallowArtistService.fallow(this.artist.id).subscribe(() => {
      this.isUserFallowing = true;
    });
  }

  unfallow() {
    this.fallowArtistService.unfallow(this.artist.id).subscribe(() => {
      this.isUserFallowing = false;
    });
  }

}
