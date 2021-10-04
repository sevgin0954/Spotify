import { Injectable } from "@angular/core";
import { ObjectValidator } from "../shared/validators/object-validator";

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  isElementInsideTheScreenVerticaly(element: Element): boolean {
    ObjectValidator.notNullOrUndefinied(element, 'element');

    const rect: DOMRect = element.getBoundingClientRect();
    const windowHeight = window.screen.height;
    const isTopInside = rect.top <= windowHeight && rect.top >= 0;
    const isBottomInside = rect.bottom >= 0 && rect.bottom <= windowHeight;

    return isTopInside && isBottomInside;
  }

  isElementOverflowingParentVerticaly(childElement: Element, parentElement: HTMLElement): boolean {
    ObjectValidator.notNullOrUndefinied(childElement, 'childElement');
    ObjectValidator.notNullOrUndefinied(parentElement, 'parentElement');
    
    const childHeight = childElement.scrollHeight;
    const parentHeight = parentElement.offsetHeight;
    
    return childHeight > parentHeight;
  }
}