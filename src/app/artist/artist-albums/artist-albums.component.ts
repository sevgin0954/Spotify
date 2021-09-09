import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { SimplifiedAlbum } from 'src/app/models/album/simplified-album';
import { ArtistService } from 'src/app/services-singleton/artist.service';

const LIMIT = 5;

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistAlbumsComponent implements OnChanges {
  @Input()
  artistId: string;

  albums$: Observable<SimplifiedAlbum[]>;

  constructor(
    private artistService: ArtistService
  ) { }

  ngOnChanges(): void {
    this.albums$ = this.artistService.getAlbums(this.artistId, LIMIT).pipe(
      pluck('items')
    );
  }
}
