import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { SimplifiedAlbum } from 'src/app/models/album/simplified-album';
import { AlbumService } from 'src/app/services-singleton/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  album$: Observable<SimplifiedAlbum>;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.album$ = this.route.params.pipe(
      concatMap(data => {
        const id = data['id'];

        return this.albumService.getById(id);
      })
    );
  }
}
