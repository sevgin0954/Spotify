import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

// TODO: Move to a separated module
@Component({
  selector: 'app-expandable-list',
  templateUrl: './expandable-list.component.html',
  styleUrls: ['./expandable-list.component.scss']
})
export class ExpandableListComponent {
  @ViewChild('tracksContainer')
  tracksContainer: ElementRef;

  @ViewChild('showTracksButton')
  showTracksButton: ElementRef;

  @ViewChild('hideTracksButton')
  hideTracksButton: ElementRef;
  
  constructor(
    private renderer2: Renderer2
  ) { }
  
  // TODO: Make to work with less than 10 items
  onShowAllTracks(): void {
    this.renderer2.setStyle(this.tracksContainer.nativeElement, 'height', 'fit-content');
    this.renderer2.setStyle(this.tracksContainer.nativeElement, 'border', 'none');
    this.renderer2.setStyle(this.tracksContainer.nativeElement, 'border-radius', '0');

    this.renderer2.setStyle(this.showTracksButton.nativeElement, 'display', 'none');
    this.renderer2.setStyle(this.hideTracksButton.nativeElement, 'display', 'block');
  }

  onHideTracks(): void {
    this.renderer2.removeStyle(this.tracksContainer.nativeElement, 'height');
    this.renderer2.removeStyle(this.tracksContainer.nativeElement, 'border');
    this.renderer2.removeStyle(this.tracksContainer.nativeElement, 'border-radius');

    this.renderer2.setStyle(this.hideTracksButton.nativeElement, 'display', 'none');
    this.renderer2.setStyle(this.showTracksButton.nativeElement, 'display', 'block');
  }
}
