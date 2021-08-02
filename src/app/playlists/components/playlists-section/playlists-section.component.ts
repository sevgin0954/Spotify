import { AfterViewInit, Renderer2 } from '@angular/core';
import { AfterViewChecked, Component, ElementRef, Input, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistService } from 'src/app/services-singleton/playlist-service';
import { Category as CategoryEnum } from '../../../shared/enums/category';

@Component({
  selector: 'app-playlists-section',
  templateUrl: './playlists-section.component.html',
  styleUrls: ['./playlists-section.component.scss']
})
export class PlaylistsSectionComponent implements OnChanges, AfterViewChecked {
  @Input()
  category: CategoryEnum;

  @ViewChildren('playlistElement')
  playlistElements: QueryList<ElementRef>;

  descriptionDisplayRows: number = 2;
  titleDisplayRows: number = 2;
  playlists: Playlist[] = [];

  constructor(
    private playlistService: PlaylistService,
    private renderer: Renderer2
  ) { }

  ngOnChanges() {
    this.playlistService.getByCategory(this.category, 10).subscribe(data => {
      this.playlists = data.items;
    });
  }

  onResize() { }

  ngAfterViewChecked(): void {
    this.updateElementsHiddenAttribute();
  }

  private updateElementsHiddenAttribute(): void {
    const firstRowPosition = this.getFirstRowElementsTopPosition();
    this.unhideAllPlaylistElements();
    this.hideWrapedElements(firstRowPosition);
  }

  private unhideAllPlaylistElements(): void {
    this.playlistElements.forEach(currentElement => {
      const currentNativeElement = currentElement.nativeElement;
      this.renderer.removeAttribute(currentNativeElement, 'hidden');
    });
  }

  private hideWrapedElements(firstRowPosition: number): void {
    this.playlistElements.forEach(currentElement => {
      const currentNativeElement = currentElement.nativeElement;
      const currentElementPosition: DOMRect = currentNativeElement.getBoundingClientRect();
      
      if (currentElementPosition.top > firstRowPosition) {
        this.renderer.setAttribute(currentNativeElement, 'hidden', 'hidden');
      }
    });
  }

  private getFirstRowElementsTopPosition(): number {
    // Highest positioned row is the first row
    let firstRowPosition = Number.MAX_VALUE;

    this.playlistElements.forEach(currentElement => {
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
