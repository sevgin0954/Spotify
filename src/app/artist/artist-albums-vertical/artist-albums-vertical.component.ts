import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { SimplifiedAlbum } from 'src/app/models/album/simplified-album';
import { ArtistService } from '../services/artist.service';

const LIMIT = 5;

@Component({
  selector: 'app-artist-albums-vertical',
  templateUrl: './artist-albums-vertical.component.html',
  styleUrls: ['./artist-albums-vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistAlbumsComponent implements OnChanges {
  @Input()
  artistId: string;

  albums$: Observable<SimplifiedAlbum[]>;

  @Output()
  hideButtonClick: EventEmitter<void> = new EventEmitter();

  @Output()
  showButtonClick: EventEmitter<void> = new EventEmitter();

  constructor(
    private artistService: ArtistService
  ) { }

  ngOnChanges(): void {
    this.albums$ = this.artistService.getAlbums(this.artistId, LIMIT).pipe(
      pluck('items')
    );
  }

  onShowButtonClick(): void {
    this.showButtonClick.emit();
  }

  onHideButtonClick(): void {
    this.hideButtonClick.emit();
  }
}