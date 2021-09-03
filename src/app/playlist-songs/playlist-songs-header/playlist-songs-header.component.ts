import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist/playlist';
import { FallowPlaylistService } from 'src/app/services-singleton/fallow-playlist.service';
import { LocalStorageService } from 'src/app/services-singleton/local-storage.service';
import { UserService } from 'src/app/services-singleton/user.service';

@Component({
  selector: 'app-playlist-songs-header',
  templateUrl: './playlist-songs-header.component.html',
  styleUrls: ['./playlist-songs-header.component.scss']
})
export class PlaylistSongsHeaderComponent implements OnChanges {
  @Input()
  playlist: Playlist;

  isUserFallowing: boolean;

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
}
