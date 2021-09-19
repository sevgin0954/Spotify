import { Component, Input, OnChanges } from '@angular/core';
import { SimplifiedAlbum } from 'src/app/models/album/simplified-album';
import { FallowAlbumService } from 'src/app/services-singleton/fallow-album.service';
import { LocalStorageService } from 'src/app/services-singleton/local-storage.service';

@Component({
  selector: 'app-album-header',
  templateUrl: './album-header.component.html',
  styleUrls: ['./album-header.component.scss']
})
export class AlbumHeaderComponent implements OnChanges {

  @Input()
  album: SimplifiedAlbum;

  loadedImage: Element;
  isUserFallowing: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    private fallowService: FallowAlbumService
  ) { }

  ngOnChanges(): void {
    const userToken = this.localStorageService.getUserToken();
    if (userToken) {
      this.fallowService.checkIfUserIsFallowingAlbum(this.album.id).subscribe(isUserFallowing => {
        this.isUserFallowing = isUserFallowing;
      });
    }
    else {
      this.isUserFallowing = false;
    }
  }

  setLoadedImage(image: Element): void {
    this.loadedImage = image;
  }

  getArtistsNames(): string[] {
    return this.album.artists.map(a => a.name);
  }

  unfallow(): void {
    this.fallowService.unfallow(this.album.id).subscribe(() => {
      this.isUserFallowing = false;
    });
  }

  fallow(): void {
    this.fallowService.fallow(this.album.id).subscribe(() => {
      this.isUserFallowing = true;
    });
  }
}