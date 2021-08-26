import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, throwError } from "rxjs";
import { LocalStorageService } from "../local-storage.service";
import { AuthService } from "../auth.service";
import { catchError, switchMap } from "rxjs/operators";
import { AuthUtility } from "src/app/shared/utilities/auth-utility";
import { MainConstants } from "src/app/shared/constants/main-constants";
import { Router } from "@angular/router";

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
        const hasUserAuthRequiredHeader = request.headers.has(MainConstants.USER_AUTHORIZATION_REQUIRED_HEADER);
        
        const modifiedHeaders = request.headers.delete(MainConstants.USER_AUTHORIZATION_REQUIRED_HEADER);
        request = request.clone({ headers: modifiedHeaders })

        return next.handle(request).pipe(
            catchError(error => {
                // Token is invalid
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    if (hasUserAuthRequiredHeader) {
                        this.localStorageService.removeUserToken();

                        this.router.navigate(['/signin']);

                        return EMPTY;
                    }
                    else {
                        return this.refreshApiToken(request, next);
                    }
                }

                return throwError(error);
            })
        );
    }

    private refreshApiToken(request: HttpRequest<any>, next: HttpHandler) {
        this.localStorageService.removeApiToken();

        return this.authService.getClientToken().pipe(
            switchMap(token => {
                this.localStorageService.setApiToken(token.access_token);
                const authToken = this.localStorageService.getApiToken();
                const headers = AuthUtility.addAuthHeaders(request.headers, authToken);

                const newRequest = request.clone({
                    headers
                });

                return next.handle(newRequest);
            })
        )
    }
}