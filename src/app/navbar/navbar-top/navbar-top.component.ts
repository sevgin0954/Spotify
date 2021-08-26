import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services-singleton/auth.service';
import { LocalStorageService } from 'src/app/services-singleton/local-storage.service';
import { RouteConstants } from 'src/app/shared/constants/route-constants';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {
  hideList: boolean = true;
  homeRoute: string = RouteConstants.HOME;
  isUserLoggedIn: boolean;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.refreshUserLoggedInState();

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.refreshUserLoggedInState();
      }
    });
  }

  private refreshUserLoggedInState(): void {
    const userToken = this.localStorageService.getUserToken();
    if (userToken) {
      this.isUserLoggedIn = true;
    }
    else {
      this.isUserLoggedIn = false;
    }
  }

  changeMenuState() {
    this.hideList = !this.hideList;
  }
}
