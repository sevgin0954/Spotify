import { Component, Input, OnChanges } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist/playlist';
import { FallowPlaylistService } from 'src/app/services-singleton/fallow-playlist.service';
import { LocalStorageService } from 'src/app/services-singleton/local-storage.service';
import { UserService } from 'src/app/services-singleton/user.service';

@Component({
  selector: 'app-playlist-tracks-header',
  templateUrl: './playlist-tracks-header.component.html',
  styleUrls: ['./playlist-tracks-header.component.scss']
})
export class PlaylistTracksHeaderComponent implements OnChanges {
  @Input()
  playlist: Playlist;

  isUserFallowing: boolean;
  loadedImage: HTMLImageElement;
  imageUrl: string;

  constructor(
    private fallowService: FallowPlaylistService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnChanges(): void {
    const userToken = this.localStorageService.getUserToken();
    if (userToken) {
      this.userService.getUser().pipe(
        switchMap(user => {
          return this.fallowService.checkIfUserIsFallowingPlaylist(this.playlist.id, user.id);
        })
      ).subscribe(isUserFallowing => {
        this.isUserFallowing = isUserFallowing;
      });
    }
    else {
      this.isUserFallowing = false;
    }
  }

  fallow(): void {
    this.fallowService.fallow(this.playlist.id).subscribe(() => {
      this.isUserFallowing = true;
    });
  }

  unfallow(): void {
    this.fallowService.unfallow(this.playlist.id).subscribe(() => {
      this.isUserFallowing = false;
    });
  }

  setLoadedImage(image: HTMLImageElement): void {
    this.loadedImage = image;
    this.imageUrl = image.currentSrc;
  }
}