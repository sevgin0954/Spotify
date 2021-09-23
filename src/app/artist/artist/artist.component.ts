import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Artist } from 'src/app/models/artist/artist';
import { ArtistService } from 'src/app/services-singleton/artist.service';

const ALBUMS_EXPANDED_CLASS = 'expanded-albums-container';
const SIMILAR_ARTISTS_SHRINKED_CLASS = 'shrinked-related-artists-container';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistComponent implements OnInit {
  artist$: Observable<Artist>;

  @ViewChild('albums')
  albumsElement: ElementRef;

  @ViewChild('artists')
  artistsElement: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private renderer2: Renderer2,
    private artistService: ArtistService
  ) { }

  ngOnInit(): void {
    this.artist$ = this.route.params.pipe(
      concatMap(params => {
        const artistId = params['id'];

        return this.artistService.getById(artistId);
      })
    );
  }

  onShowButtonClick(): void {
    this.renderer2.addClass(this.albumsElement.nativeElement, ALBUMS_EXPANDED_CLASS);
    this.renderer2.addClass(this.artistsElement.nativeElement, SIMILAR_ARTISTS_SHRINKED_CLASS);
  }

  onHideButtonClick(): void {
    this.renderer2.removeClass(this.albumsElement.nativeElement, ALBUMS_EXPANDED_CLASS);
    this.renderer2.removeClass(this.artistsElement.nativeElement, SIMILAR_ARTISTS_SHRINKED_CLASS);
  }
}