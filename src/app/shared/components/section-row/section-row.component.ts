import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Input, QueryList, Renderer2, TemplateRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-section-row',
  templateUrl: './section-row.component.html',
  styleUrls: ['./section-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionRowComponent implements AfterViewChecked {
  @Input()
  elements: any[] = [];

  @Input()
  template: TemplateRef<any>;

  @ViewChildren('element')
  elementRefs: QueryList<ElementRef>;

  constructor(
    private renderer2: Renderer2
  ) { }

  onResize() { }

  ngAfterViewChecked(): void {
    this.updateElementsHiddenAttribute();
  }

  private updateElementsHiddenAttribute(): void {
    this.unhideAllPlaylistElements();
    const firstRowPosition = this.getFirstRowElementsTopPosition();
    this.hideWrapedElements(firstRowPosition);
  }

  private unhideAllPlaylistElements(): void {
    this.elementRefs.forEach(currentElement => {
      const currentNativeElement = currentElement.nativeElement;
      this.renderer2.removeAttribute(currentNativeElement, 'hidden');
    });
  }

  private hideWrapedElements(firstRowPosition: number): void {
    this.elementRefs.forEach(currentElement => {
      const currentNativeElement = currentElement.nativeElement;
      const currentElementPosition: DOMRect = currentNativeElement.getBoundingClientRect();

      if (currentElementPosition.top !== firstRowPosition) {
        this.renderer2.setAttribute(currentNativeElement, 'hidden', 'hidden');
      }
    });
  }

  private getFirstRowElementsTopPosition(): number {
    // Highest positioned row is the first row
    let firstRowPosition = Number.MAX_VALUE;

    this.elementRefs.forEach(currentElement => {
      const currentNativeElement = currentElement.nativeElement;

      const currentElementPosition: DOMRect = currentNativeElement.getBoundingClientRect();
      const currentElementTopPosition = currentElementPosition.top;

      if (currentElementTopPosition) {
        if (currentElementTopPosition < firstRowPosition) {
          firstRowPosition = currentElementTopPosition;
        }
      }
    });

    return firstRowPosition;
  }
}