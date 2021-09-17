import { Injectable } from "@angular/core";
import * as colorthief from 'colorthief';

const COLOR_THIEF_PROTO = colorthief.default.prototype;

@Injectable({
    providedIn: 'root'
})
export class ColorService {
    getDominantColorRgb(image: Element): number[] {
        const rgbColor = COLOR_THIEF_PROTO.getColor(image);

        return rgbColor;
    }

    getPallete(image: Element): [number[]] {
        const rgbColor = COLOR_THIEF_PROTO.getPalette(image);

        return rgbColor;
    }

    getLightestColorHsl(image: Element): number[] {
        let lightestHslColor: number[] = [];

        const pallete = this.getPallete(image);
        
        pallete.forEach(currentRgbColor => {
          const currentHslColor = this.rgbToHsl(currentRgbColor);
    
          if (lightestHslColor.length === 0) {
            lightestHslColor = currentHslColor;
          }
          else if (currentHslColor[2] > lightestHslColor[2]) {
            lightestHslColor = currentHslColor;
          }
        });

        return lightestHslColor;
    }

    rgbToHsl(rgb: number[]): number[] {
        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];

        r /= 255, g /= 255, b /= 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    }
}