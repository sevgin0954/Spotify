import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistService } from 'src/app/services-singleton/playlist-service';
import { Dictionary } from 'src/app/shared/dictionary';
import { Category as CategoryEnum } from '../../shared/enums/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private categoryPlaylist = new Dictionary<Playlist>();
  categories: string[] = [];

  descriptionDisplayRows: number = 2;
  titleDisplayRows: number = 2;

  constructor(
    private playlistService: PlaylistService
  ) { }

  getPlaylistByCategory(category: string): Playlist[] {
    return this.categoryPlaylist.getValuesByKey(category);
  }

  ngOnInit() {
    const category = CategoryEnum.Mood;
    this.playlistService.getByCategory(category, 10).subscribe(data => {
      this.categoryPlaylist.set(CategoryEnum[category], data.items);
      this.categories = this.categoryPlaylist.getKeys();
    });
  }
}
