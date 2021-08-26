import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist/playlist';
import { Track } from 'src/app/models/track/track';
import { SongService } from 'src/app/services-singleton/song.service';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrls: ['./liked-songs.component.scss']
})
export class LikedSongsComponent implements OnInit {

  tracks: Track[] = [];
  playlistName: string = 'Liked songs';
  ownerName: string = '';
  totalTracks: number = 0;

  constructor(
    private songService: SongService
  ) { }

  ngOnInit(): void {
    this.songService.getLikedSongs().subscribe(data => {
      this.tracks = data.items;

      this.totalTracks = data.total;
    })
  }

}
