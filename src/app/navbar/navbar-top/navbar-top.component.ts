import { Component, OnInit } from '@angular/core';
import { RouteConstants } from 'src/app/shared/constants/route-constants';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent {
  hideList: boolean = true;
  homeRoute: string = RouteConstants.HOME;

  changeMenuState() {
    this.hideList = !this.hideList;
  }
}
