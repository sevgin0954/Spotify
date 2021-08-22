import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from 'src/app/models/playlist/playlist';

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.component.html',
  styleUrls: ['./playlist-songs.component.scss']
})
export class PlaylistSongsComponent implements OnInit {

  playlist: Playlist;

  @ViewChild('header')
  header: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(params => {
      this.playlist = params['playlist'];
    });
  }

}
