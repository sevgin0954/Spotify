import { Component, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track/track';
import { TracksService } from 'src/app/services-singleton/tracks.service';

@Component({
  selector: 'app-liked-tracks',
  templateUrl: './liked-tracks.component.html',
  styleUrls: ['./liked-tracks.component.scss']
})
export class LikedTracksComponent implements OnInit {

  tracks: Track[] = [];
  isTrackLiked: boolean[] = [];
  playlistName: string = 'Liked songs';
  ownerName: string = '';
  totalTracks: number = 0;

  constructor(
    private songService: TracksService
  ) { }

  ngOnInit(): void {
    this.songService.getLikedSongs().subscribe(data => {
      this.tracks = data.items;
      this.isTrackLiked = new Array(this.tracks.length).fill(true);

      this.totalTracks = data.total;
    })
  }
}