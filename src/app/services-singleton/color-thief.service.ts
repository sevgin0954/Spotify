import { Injectable } from "@angular/core";
import * as colorthief from 'colorthief';

@Injectable({
    providedIn: 'root'
})
export class ColorThiefService {
    getDominantColorRgb(image: Element): number[] {
        const colorThiefProto = colorthief.default.prototype;
        const rgbColor = colorThiefProto.getColor(image);

        return rgbColor;
    }
}