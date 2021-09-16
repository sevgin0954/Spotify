import { ChangeDetectionStrategy, Component, Input, Renderer2 } from '@angular/core';
import { ColorService } from 'src/app/services-singleton/color.service';
import { MainConstants } from 'src/app/shared/constants/main-constants';

@Component({
  selector: 'app-box-shadow-colored',
  templateUrl: './box-shadow-colored.component.html',
  styleUrls: ['./box-shadow-colored.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxShadowColoredComponent {

  @Input()
  image: Element;

  @Input('container')
  container: Element;

  constructor(
    private colorService: ColorService,
    private renderer2: Renderer2
  ) { }
  
  trySetBorderStyles(): void {
    if (this.container === undefined) {
      return;
    }

    const rgbColor = this.colorService.getDominantColorRgb(this.image);
    const hslColor = this.colorService.rgbToHsl(rgbColor);
    hslColor[2] = MainConstants.CARD_BORDER_LIGHTNESS;

    this.renderer2.setStyle(
      this.container, 'box-shadow', `0px 0px 6px 3px hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]}%)`
    );
  }

  tryRemoveBorderStyles(): void {
    if (this.container === undefined) {
      return;
    }

    this.renderer2.removeStyle(this.container, 'box-shadow');
  }
}
