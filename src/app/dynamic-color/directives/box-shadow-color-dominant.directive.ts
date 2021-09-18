import { Directive, HostBinding, HostListener, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MainConstants } from 'src/app/shared/constants/main-constants';
import { ColorService } from '../services/color.service';

@Directive({
  selector: '[appBoxShadowColorDominant]'
})
export class BoxShadowColorDominantDirective implements OnChanges {

  @Input('appBoxShadowColorDominant')
  image: Element;

  @HostBinding('style.boxShadow')
  boxShadow: SafeStyle;

  private isMouseCurrentlyHovering: boolean;

  constructor(
    private colorService: ColorService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnChanges(): void {
    if (this.isMouseCurrentlyHovering) {
      this.trySetBorderStyles();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isMouseCurrentlyHovering = true;
    this.trySetBorderStyles();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isMouseCurrentlyHovering = false;
    this.tryRemoveBorderStyles();
  }

  private trySetBorderStyles(): void {
    if (this.image === undefined) {
      return;
    }

    const rgbColor = this.colorService.getDominantColorRgb(this.image);
    const hslColor = this.colorService.rgbToHsl(rgbColor);
    hslColor[2] = MainConstants.CARD_BORDER_LIGHTNESS;

    this.boxShadow = this.sanitizer
      .bypassSecurityTrustStyle(`0px 0px 6px 3px hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]}%)`);
  }

  private tryRemoveBorderStyles(): void {
    if (this.image === undefined) {
      return;
    }

    this.boxShadow = this.sanitizer
      .bypassSecurityTrustStyle(``);
  }
}