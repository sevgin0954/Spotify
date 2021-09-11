import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/artist/artist';

const ALBUMS_EXPANDED_CLASS = 'expanded-albums-container';
const SIMILAR_ARTISTS_SHRINKED_CLASS = 'shrinked-related-artists-container';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist: Artist;

  @ViewChild('albums')
  albumsElement: ElementRef;

  @ViewChild('artists')
  artistsElement: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.initializeArtistProperties();
  }

  private initializeArtistProperties(): void {
    this.route.data.subscribe(data => {
      this.artist = data['artist'];
    });
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
