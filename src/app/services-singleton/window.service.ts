import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  isElementInsideTheScreenVerticaly(element: Element): boolean {
    const rect: DOMRect = element.getBoundingClientRect();
    const windowHeight = document.documentElement.clientHeight;
    const isTopInside = rect.top <= windowHeight && rect.top >= 0;
    const isBottomInside = rect.bottom >= 0 && rect.bottom <= windowHeight;

    return isTopInside || isBottomInside;
  }

  isElementOverflowingParent(childElement: Element, parentElement: HTMLElement): boolean {
    const childHeight = childElement.scrollHeight;
    const parentHeight = parentElement.offsetHeight;

    return childHeight > parentHeight;
  }
}