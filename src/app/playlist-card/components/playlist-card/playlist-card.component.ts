import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ColorThiefService } from 'src/app/services-singleton/color-thief.service';
import { Playlist } from '../../../models/playlist/playlist';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistCardComponent implements AfterViewInit {
  @Input()
  playlist: Playlist;

  @ViewChild('description')
  description: ElementRef;

  @ViewChild('image')
  image: ElementRef;

  @ViewChild('card')
  card: ElementRef;

  constructor(
    private renderer2: Renderer2,
    private colorThiefService: ColorThiefService
  ) { }

  ngAfterViewInit(): void {
    const child = this.description.nativeElement.children[0];
    if (child) {
      this.description.nativeElement.children[0].setAttribute('style', `color: white; text-decoration: underline;`);
    }
  }

  trySetBorderStyles(): void {
    if (this.card.nativeElement === undefined) {
      return;
    }

    const rgbColor = this.colorThiefService.getDominantColorRgb(this.image.nativeElement);
    const rgbColorStr = rgbColor.join(', ');
    this.renderer2.setStyle(this.card.nativeElement, 'box-shadow' , `0px 0px 6px 3px rgb(${rgbColorStr})`);
  }

  tryRemoveBorderStyles(): void {
    if (this.card.nativeElement === undefined) {
      return;
    }

    //this.renderer2.removeStyle(this.card.nativeElement, 'box-shadow');
  }
}