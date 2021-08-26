import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services-singleton/local-storage.service';
import { RouteConstants } from 'src/app/shared/constants/route-constants';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.localStorageService.removeUserToken();
    this.router.navigateByUrl(RouteConstants.HOME);
  }

}
