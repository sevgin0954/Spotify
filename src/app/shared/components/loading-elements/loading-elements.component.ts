import { AfterViewChecked, Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { WindowService } from 'src/app/services-singleton/window.service';
import isRequired from '../../decorators/isRequired';

@Component({
  selector: 'app-loading-elements',
  templateUrl: './loading-elements.component.html',
  styleUrls: ['./loading-elements.component.scss']
})
export class LoadingElementsComponent implements AfterViewChecked {
  @Input()
  @isRequired
  isLoadingDisabled: boolean;

  @Input()
  @isRequired
  loadingCallback: Function;

  @Input()
  @isRequired
  isCurrentlyLoading: boolean;

  @ViewChild('loading')
  private loadingElement: ElementRef;

  constructor(
    private windowService: WindowService,
    private renderer2: Renderer2
  ) { }

  ngAfterViewChecked(): void {
    if (this.isLoadingDisabled) {
      this.renderer2.setAttribute(this.loadingElement.nativeElement, 'hidden', 'hidden');
    }
    else {
      this.renderer2.removeAttribute(this.loadingElement.nativeElement, 'hidden');
    }
  }

  @HostListener("window:scroll")
  onScroll(): void {
    if (this.isLoadingDisabled || this.isCurrentlyLoading) {
      return;
    }

    const loadingElement = this.loadingElement.nativeElement;

    if (loadingElement == null) {
      return;
    }

    const isLoadingVisible = this.windowService
      .isElementInsideTheScreenVerticaly(loadingElement);
    if (isLoadingVisible) {
      this.loadingCallback();
    }
  }
}