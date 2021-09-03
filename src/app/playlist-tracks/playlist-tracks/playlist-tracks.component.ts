import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from 'src/app/models/playlist/playlist';

@Component({
  selector: 'app-playlist-tracks',
  templateUrl: './playlist-tracks.component.html',
  styleUrls: ['./playlist-tracks.component.scss']
})
export class PlaylistTracksComponent implements OnInit {

  playlist: Playlist;

  @ViewChild('header')
  header: ElementRef;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(params => {
      this.playlist = params['playlist'];
    });
  }

}
