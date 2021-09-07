import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Artist } from 'src/app/models/artist/artist';
import { FallowArtistService } from 'src/app/services-singleton/fallow-artist.service';
import { LocalStorageService } from 'src/app/services-singleton/local-storage.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  isUserFallowing: boolean;
  artist: Artist;
  fireCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private fallowArtistService: FallowArtistService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(
      concatMap(params => {
        this.artist = params['artist'];
        this.fireCount = this.artist.popularity / 20;

        const userToken = this.localStorageService.getUserToken();
        if (userToken) {
          return this.fallowArtistService.checkIfCurrentUserIsFallowing(this.artist.id);
        }
        else {
          return of(false);
        }
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

  getFallowerCount(): string {
    const result: string[] = [];
    const separator = ',';
    
    const partsCount = 3;
    let fallowerCountString = this.artist.followers.total.toString();
    for (let i = fallowerCountString.length - partsCount; i > 0; i-=partsCount) {

      const currentPart = fallowerCountString.substring(i, i + partsCount);
      result.push(currentPart);
    }

    const leftPartCount = fallowerCountString.length % 3;
    const leftPartString = fallowerCountString.substring(0, leftPartCount);
    result.push(leftPartString);

    const resultString = result.reverse().join(separator);
    return resultString;
  }

}
