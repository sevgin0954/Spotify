import { Renderer2 } from '@angular/core';
import { AfterViewChecked, Component, ElementRef, Input, OnChanges, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistCardComponent } from '../components/playlist-card/playlist-card.component';
import { loadPlaylistsCallback } from '../types';

@Component({
  selector: 'app-playlists-section',
  templateUrl: './playlists-section.component.html',
  styleUrls: ['./playlists-section.component.scss']
})
export class PlaylistsSectionComponent implements OnChanges, AfterViewChecked {
  @Input()
  loadPlaylistsCallback: loadPlaylistsCallback;

  @ViewChildren(PlaylistCardComponent, { read: ElementRef })
  playlistElements: QueryList<ElementRef>;

  descriptionDisplayRows: number = 2;
  titleDisplayRows: number = 2;
  playlists$: Observable<Playlist[]>;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnChanges() {
    this.playlists$ = this.loadPlaylistsCallback().pipe(
      pluck('items')
    );
  }

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
    this.playlistElements.forEach(currentElement => {
      const currentNativeElement = currentElement.nativeElement;
      this.renderer.removeAttribute(currentNativeElement, 'hidden');
    });
  }

  private hideWrapedElements(firstRowPosition: number): void {
    this.playlistElements.forEach(currentElement => {
      const currentNativeElement = currentElement.nativeElement;
      const currentElementPosition: DOMRect = currentNativeElement.getBoundingClientRect();

      if (currentElementPosition.top !== firstRowPosition) {
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
