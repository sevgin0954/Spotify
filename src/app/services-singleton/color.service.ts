import { Injectable } from "@angular/core";
import * as colorthief from 'colorthief';

@Injectable({
    providedIn: 'root'
})
export class ColorService {
    getDominantColorRgb(image: Element): number[] {
        const colorThiefProto = colorthief.default.prototype;
        const rgbColor = colorThiefProto.getColor(image);

        return rgbColor;
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