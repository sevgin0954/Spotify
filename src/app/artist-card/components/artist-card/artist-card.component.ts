import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist/artist';
import { Image } from 'src/app/models/image/image';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistCardComponent {
  @Input()
  artist: Artist;
  
  getImage(): Image {
    const images = this.artist.images;

    return images[0];
  }
}
