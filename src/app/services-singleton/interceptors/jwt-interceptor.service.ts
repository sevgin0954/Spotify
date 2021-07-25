import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, throwError } from "rxjs";
import { MainConstants } from "src/app/shared/constants/main-constants";
import { LocalStorageService } from "../local-storage.service";
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthService } from "../auth-service";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this.updateAuthorizationToken(request);

                return EMPTY;
            }

            return throwError(error);
        }));
    }
    private updateAuthorizationToken(request: HttpRequest<any>) {
        const hasUserAuthorizationRequiredHeader = request.headers.has(MainConstants.USER_AUTHORIZATION_REQUIRED_HEADER);
        if (hasUserAuthorizationRequiredHeader) {
            this.router.navigate(['/signin']);
        }
        else {
            this.authService.getClientToken().subscribe(data => {
                this.localStorageService.setToken(data.access_token);
            });
        }
    }

}