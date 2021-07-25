import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Playlist } from '../models/playlist/playlist';
import { PlaylistService } from '../services-singleton/playlist-service';
import { Category } from '../shared/enums/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistService.getByCategory(Category[Category.Mood], 10).subscribe(data => this.playlists = data.items);
  }
}
