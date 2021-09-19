import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services-singleton/auth.service';
import { LocalStorageService } from 'src/app/services-singleton/local-storage.service';
import { MainConstants } from 'src/app/shared/constants/main-constants';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const redirectUri = window.location.origin + '/signin';

    const url = location.href;
    const queryParams = url.split('?')[1];
    if (queryParams) {
      this.parseQueryParams(queryParams, redirectUri);
    }
    else {
      this.redirectToLoginPage(redirectUri);
    }
  }

  private parseQueryParams(queryParams: string, redirectUri: string): void {
    const isError = queryParams.indexOf('error') >= 0;
      if (isError === true) {
        // TODO: Handle error
      }
      else {
        const queryParts = queryParams.split('&');
        const codePart = queryParts.find(qp => qp.indexOf('code') >= 0);
        const code = (codePart as string).split('=')[1];

        this.authService.getUserToken(code, redirectUri).subscribe(data => {
          this.localStorageService.setUserToken(data.access_token);

          this.router.navigateByUrl('/');
        });
      }
  }

  private redirectToLoginPage(redirectUri: string): void {
    window.location.href = 'https://accounts.spotify.com/authorize?' +
      `client_id=${MainConstants.CLIENT_ID}&` +
      `redirect_uri=${redirectUri}&` +
      'response_type=code&' +
      'scope=' +
      'user-library-read playlist-read-private playlist-read-collaborative user-follow-modify user-follow-read playlist-modify-public playlist-modify-private user-library-modify';
  }
}
