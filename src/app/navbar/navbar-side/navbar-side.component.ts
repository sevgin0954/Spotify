import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { NavigationEnd, NavigationError, Router } from '@angular/router';

const HIGHTLIGHT_CLASS = 'hightlight';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements AfterViewInit {
  @ViewChildren('menuElement')
  menuElements: QueryList<ElementRef>

  // TODO: Make home route global constant
  homeRoute: string = '/';
  searchRoute: string = '/categories';
  libraryRoute: string = '/library';
  likedRoute: string = '/liked';

  constructor(
    private router: Router,
    private renderer2: Renderer2
  ) { }

  ngAfterViewInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.higthlightCurrentRouteMenu(currentRoute);
      }
      else if (e instanceof NavigationError) {
        // TODO: Throw error
      }
    });
  }

  private higthlightCurrentRouteMenu(currentRoute: string): void {
    this.menuElements.forEach(currentElement => {
      if (currentElement.nativeElement['id'] === currentRoute) {
        this.renderer2.addClass(currentElement.nativeElement, HIGHTLIGHT_CLASS);
      }
      else {
        this.renderer2.removeClass(currentElement.nativeElement, HIGHTLIGHT_CLASS);
      }
    });
  }
}
