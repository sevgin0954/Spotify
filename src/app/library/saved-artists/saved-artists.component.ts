import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist/artist';
import { UserLibraryService } from '../services/user-library.service';

@Component({
  selector: 'app-saved-artists',
  templateUrl: './saved-artists.component.html',
  styleUrls: ['./saved-artists.component.scss']
})
export class SavedArtistsComponent implements OnInit {

  artists: Artist[] = [];
  isLoadingDisabled: boolean = true;
  isCurrentlyLoading: boolean = false;

  constructor(
    private userLibraryService: UserLibraryService
  ) { }

  ngOnInit(): void {
    this.loadMoreArtists();
  }

  loadMoreArtists = () => {
    this.isCurrentlyLoading = true;

    this.userLibraryService.getSavedArtists().subscribe(data => {
      this.artists.push(...data.items);

      if (data.next) {
        this.isLoadingDisabled = false;
      }
      else {
        this.isLoadingDisabled = true;
      }

      this.isCurrentlyLoading = false;
    });
  }
}
