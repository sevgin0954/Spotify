import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/models/artist/artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist: Artist;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeArtistProperties();
  }

  private initializeArtistProperties(): void {
    this.route.data.subscribe(data => {
      this.artist = data['artist'];
    });
  }
}
