import { Component, OnInit } from '@angular/core';
import { UserAlbumsService } from 'src/app/services-singleton/user-albums.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  constructor(
    private userAlbumService: UserAlbumsService
  ) { }

  ngOnInit(): void {
    this.userAlbumService.getSavedAlbums().subscribe(data => {
      console.log(data)
    })
  }

}
