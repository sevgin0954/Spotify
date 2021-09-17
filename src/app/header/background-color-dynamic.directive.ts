import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { ColorService } from '../services-singleton/color.service';

@Directive({
  selector: '[appBackgroundColorDynamic]'
})
export class BackgroundColorDynamicDirective implements OnChanges {

  @Input('appBackgroundColorDynamic')
  image: Element;

  constructor(
    private renderer2: Renderer2,
    private colorService: ColorService,
    private hostElementRef: ElementRef
  ) { }

  ngOnChanges(): void {
    if (this.image === undefined) {
      return;
    }

    this.setBackgroundColor(this.image, this.hostElementRef.nativeElement);
  }

  private setBackgroundColor(image: Element, header: Element): void {
    const rgbColor = this.colorService.getDominantColorRgb(image);
    const rgbColorStr = rgbColor.join(', ');

    this.renderer2.setStyle(
        header, 'background', `linear-gradient(180deg, rgba(${rgbColorStr},1) 0%, rgba(${rgbColorStr},0.1) 100%)`
    );
}

}
