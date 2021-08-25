import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements AfterViewInit {
  // TODO: Move to a constant
  playlistsRoute: string = 'playlists';
  artistsRoute: string = 'artists';
  albumsRoute: string = 'albums';

  @ViewChildren('menuElement')
  menuElements: QueryList<ElementRef>

  constructor(
    private router: Router,
    private renderer2: Renderer2
  ) { }

  ngAfterViewInit(): void {
    const currentRoute = this.getLastRoute();
    this.hightlightCurrentMenu(currentRoute);
    
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const currentRoute = this.getLastRoute();
        this.hightlightCurrentMenu(currentRoute);
      }
    })
  }

  private getLastRoute(): string {
    const routeParts = this.router.url.split('/');
    return routeParts[routeParts.length - 1];
  }

  private hightlightCurrentMenu(currentRoute: string): void {
    const hightlightedClass = 'hightlight';

    this.menuElements.forEach(currentElement => {
      if (currentElement.nativeElement['id'] === `${currentRoute}`) {
        this.renderer2.addClass(currentElement.nativeElement, hightlightedClass);
      }
      else {
        this.renderer2.removeClass(currentElement.nativeElement, hightlightedClass);
      }
    });
  }
}
