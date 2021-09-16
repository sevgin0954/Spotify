import { Component, ElementRef, Input, OnChanges, Renderer2, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist/playlist';
import { ColorService } from 'src/app/services-singleton/color.service';
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

  @ViewChild('image')
  image: ElementRef;

  @ViewChild('header')
  header: ElementRef;

  isUserFallowing: boolean;

  constructor(
    private fallowService: FallowPlaylistService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private renderer2: Renderer2,
    private colorThiefService: ColorService
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

  setBackgroundColor(): void {
    const rgbColor = this.colorThiefService.getDominantColorRgb(this.image.nativeElement);
    const rgbColorStr = rgbColor.join(', ');

    this.renderer2.setStyle(
      // TODO: Reuse style
      this.header.nativeElement, 'background', `linear-gradient(180deg, rgba(${rgbColorStr},1) 0%, rgba(${rgbColorStr},0.1) 100%)`
    );
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
