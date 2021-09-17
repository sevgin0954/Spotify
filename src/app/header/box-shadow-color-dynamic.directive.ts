import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ColorService } from '../services-singleton/color.service';

@Directive({
  selector: '[appBoxShadowColorDynamic]'
})
export class BoxShadowColorDynamicDirective {

  @HostBinding('style')
  style: SafeStyle;

  constructor(
    private colorService: ColorService,
    private sanitizer: DomSanitizer,
    private image: ElementRef
  ) { }

  @HostListener('load')
  setImageBorderColor(): void {
    const lightestHslColor = this.colorService.getLightestColorHsl(this.image.nativeElement);

    this.style = this.sanitizer.bypassSecurityTrustStyle(
      `box-shadow: 0px 0px 2px 1px hsl(${lightestHslColor[0]}, ${lightestHslColor[1]}%, ${lightestHslColor[2]}%)`
    );
  }

}
