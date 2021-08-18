import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class WindowService {
    isElementInsideTheScreenVerticaly(element: Element): boolean {
        const rect: ClientRect = element.getBoundingClientRect();
        const windowHeight = document.documentElement.clientHeight;
        const isTopInside = rect.top <= windowHeight && rect.top >= 0;
        const isBottomInside = rect.bottom >= 0 && rect.bottom <= windowHeight;
    
        return isTopInside || isBottomInside;
      }
}