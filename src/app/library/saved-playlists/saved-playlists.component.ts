import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist/playlist';
import { UserLibraryService } from 'src/app/library/services/user-library.service';

@Component({
  selector: 'app-saved-playlists',
  templateUrl: './saved-playlists.component.html',
  styleUrls: ['./saved-playlists.component.scss']
})
export class SavedPlaylistsComponent implements OnInit {

  playlists: Playlist[] = [];
  isLoadingDisabled: boolean = true;

  constructor(
    private userLibraryService: UserLibraryService
  ) { }

  ngOnInit(): void {
    this.loadMorePlaylists();
  }

  loadMorePlaylists = () => {
    this.userLibraryService.getSavedPlaylists().subscribe(data => {
      this.playlists.push(...data.items);

      if (data.next) {
        this.isLoadingDisabled = false;
      }
      else {
        this.isLoadingDisabled = true;
      }
    });
  }
}