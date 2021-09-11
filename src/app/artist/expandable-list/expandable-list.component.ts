import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { WindowService } from 'src/app/services-singleton/window.service';

// TODO: Move to a separated module
@Component({
  selector: 'app-expandable-list',
  templateUrl: './expandable-list.component.html',
  styleUrls: ['./expandable-list.component.scss']
})
export class ExpandableListComponent implements AfterContentChecked {
  @ViewChild('elementsContainer')
  elementsContainer: ElementRef;

  @ViewChild('contentContainer')
  contentContainer: ElementRef;

  @ViewChild('showTracksButton')
  showTracksButton: ElementRef;

  @ViewChild('hideTracksButton')
  hideTracksButton: ElementRef;

  @Output()
  hideButtonClick: EventEmitter<void> = new EventEmitter();

  @Output()
  showButtonClick: EventEmitter<void> = new EventEmitter();

  constructor(
    private renderer2: Renderer2,
    private windowService: WindowService
  ) { }

  ngAfterContentChecked(): void {
    if (this.contentContainer === undefined || this.elementsContainer === undefined) {
      return;
    }

    const isOverflowing = 
      this.windowService.isElementOverflowingParent(this.contentContainer.nativeElement, this.elementsContainer.nativeElement);
    if (isOverflowing === false) {
      this.renderer2.setStyle(this.showTracksButton.nativeElement, 'display', 'none');
      this.removeBorder();
    }
  }

  onShowAllTracks(): void {
    this.renderer2.setStyle(this.elementsContainer.nativeElement, 'height', 'fit-content');
    this.removeBorder();

    this.renderer2.setStyle(this.showTracksButton.nativeElement, 'display', 'none');
    this.renderer2.setStyle(this.hideTracksButton.nativeElement, 'display', 'block');

    this.showButtonClick.emit();
  }

  onHideTracks(): void {
    this.renderer2.removeStyle(this.elementsContainer.nativeElement, 'height');
    this.renderer2.removeStyle(this.elementsContainer.nativeElement, 'border');
    this.renderer2.removeStyle(this.elementsContainer.nativeElement, 'border-radius');

    this.renderer2.setStyle(this.hideTracksButton.nativeElement, 'display', 'none');
    this.renderer2.setStyle(this.showTracksButton.nativeElement, 'display', 'block');

    this.hideButtonClick.emit();
  }

  private removeBorder(): void {
    this.renderer2.setStyle(this.elementsContainer.nativeElement, 'border', 'none');
    this.renderer2.setStyle(this.elementsContainer.nativeElement, 'border-radius', '0');
  }
}
