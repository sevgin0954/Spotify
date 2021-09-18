import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SimplifiedAlbum } from 'src/app/models/album/simplified-album';
import { SimplifiedArtist } from 'src/app/models/artist/simplified-artist';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumCardComponent {
  @Input()
  album: SimplifiedAlbum;

  loadedImage: Element;

  getArtistsString(artists: SimplifiedArtist[]): string {
    return artists.map(a => a.name).join(', ');
  }

  setLoadedImage(image: Element): void {
    this.loadedImage = image;
  }
}
