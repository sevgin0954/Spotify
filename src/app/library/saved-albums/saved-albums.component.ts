import { Component, OnInit } from '@angular/core';
import { SavedAlbum } from 'src/app/models/album/saved-album';
import { SimplifiedArtist } from 'src/app/models/artist/simplified-artist';
import { UserLibraryService } from '../services/user-library.service'

@Component({
  selector: 'app-saved-albums',
  templateUrl: './saved-albums.component.html',
  styleUrls: ['./saved-albums.component.scss']
})
export class SavedAlbumsComponent implements OnInit {

  albums: SavedAlbum[];

  constructor(
    private userLibraryService: UserLibraryService
  ) { }

  ngOnInit(): void {
    this.userLibraryService.getSavedAlbums().subscribe(data => {
      this.albums = data.items;
    });
  }
}
