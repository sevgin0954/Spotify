import { AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { NavigationEnd, NavigationError, Router } from '@angular/router';
import { RouteConstants } from 'src/app/shared/constants/route-constants';

const HIGHTLIGHT_CLASS = 'hightlight';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements AfterViewInit {
  @ViewChildren('menuElement')
  menuElements: QueryList<ElementRef>

  homeRoute: string = RouteConstants.HOME;
  searchRoute: string = '/categories';
  libraryRoute: string = '/library/playlists';
  likedRoute: string = '/liked';

  homeRegex: string = `^${RouteConstants.HOME}$`;
  searchRegex: string = '^/categories$';
  libraryRegex: string = '/library';
  likedRegex: string = '^/liked$';

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
      const currentElementRegexp = new RegExp(currentElement.nativeElement['id']);
      if (currentRoute.match(currentElementRegexp)) {
        this.renderer2.addClass(currentElement.nativeElement, HIGHTLIGHT_CLASS);
      }
      else {
        this.renderer2.removeClass(currentElement.nativeElement, HIGHTLIGHT_CLASS);
      }
    });
  }
}
