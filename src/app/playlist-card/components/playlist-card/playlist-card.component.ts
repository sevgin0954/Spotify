import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ColorThiefService } from 'src/app/services-singleton/color-thief.service';
import { Playlist } from '../../../models/playlist/playlist';

const LIGHTNESS = 40;

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
    const hslColor = this.rgbToHsl(rgbColor);
    hslColor[2] = LIGHTNESS;

    this.renderer2
      .setStyle(this.card.nativeElement, 'box-shadow', `0px 0px 6px 3px hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]}%)`);
  }

  // TODO: Move to service
  private rgbToHsl(rgb: number[]): number[] {
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 360 , s * 100, l * 100];
  }

  tryRemoveBorderStyles(): void {
    if (this.card.nativeElement === undefined) {
      return;
    }

    this.renderer2.removeStyle(this.card.nativeElement, 'box-shadow');
  }
}