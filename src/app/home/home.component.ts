import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services-singleton/playlist-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistService.getByCategory().subscribe(data => console.log(data))
  }
}
