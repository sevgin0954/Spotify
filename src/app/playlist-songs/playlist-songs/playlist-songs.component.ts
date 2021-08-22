import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from 'src/app/models/playlist/playlist';

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.component.html',
  styleUrls: ['./playlist-songs.component.scss']
})
export class PlaylistSongsComponent implements OnInit {

  playlist: Playlist;

  constructor(
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(params => {
      this.playlist = params['playlist'];
    });
  }

}
