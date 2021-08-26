import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Artist } from 'src/app/models/artist/artist';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistCardComponent {
  @Input()
  artist: Artist;
}
