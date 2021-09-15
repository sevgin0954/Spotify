import { Component, ElementRef, Input, OnChanges, Renderer2, ViewChild } from '@angular/core';
import { Artist } from 'src/app/models/artist/artist';
import { ColorThiefService } from 'src/app/services-singleton/color-thief.service';
import { FallowArtistService } from 'src/app/services-singleton/fallow-artist.service';
import { LocalStorageService } from 'src/app/services-singleton/local-storage.service';

@Component({
  selector: 'app-artist-header',
  templateUrl: './artist-header.component.html',
  styleUrls: ['./artist-header.component.scss']
})
export class ArtistHeaderComponent implements OnChanges {
  @Input()
  artist: Artist;

  @ViewChild('image')
  image: ElementRef;

  @ViewChild('header')
  header: ElementRef;

  isUserFallowing: boolean;
  popularityCount: number;

  constructor(
    private fallowArtistService: FallowArtistService,
    private localStorageService: LocalStorageService,
    private renderer2: Renderer2,
    private colorThiefService: ColorThiefService
  ) { }

  ngOnChanges(): void {
    this.popularityCount = this.artist.popularity / 20;

    this.initializeIsUserFallowingProperty();
  }

  private initializeIsUserFallowingProperty(): void {
    const userToken = this.localStorageService.getUserToken();
    if (userToken) {
      this.fallowArtistService.checkIfCurrentUserIsFallowing(this.artist.id).subscribe(data => {
        this.isUserFallowing = data;
      });
    }
    else {
      // Guest user can't be fallowing
      this.isUserFallowing = false;
    }
  }

  setBackgroundColor(): void {
    const rgbColor = this.colorThiefService.getDominantColorRgb(this.image.nativeElement);
    const rgbColorStr = rgbColor.join(', ');

    this.renderer2.setStyle(
      this.header.nativeElement, 'background', `linear-gradient(180deg, rgba(${rgbColorStr},1) 0%, rgba(${rgbColorStr},0.1) 100%)`
    );
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
    for (let i = fallowerCountString.length - partsCount; i >= 0; i -= partsCount) {

      const currentPart = fallowerCountString.substring(i, i + partsCount);
      result.push(currentPart);
    }

    const leftPartCount = fallowerCountString.length % 3;
    if (leftPartCount > 0) {
      const leftPartString = fallowerCountString.substring(0, leftPartCount);
      result.push(leftPartString);
    }

    const resultString = result.reverse().join(separator);
    return resultString;
  }
}