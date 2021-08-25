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
                        this.router.navigate(['/signin']);

                        return EMPTY;
                    }
                    else {
                        return this.refreshClientToken(request, next);
                    }
                }

                return throwError(error);
            })
        );
    }

    private refreshClientToken(request: HttpRequest<any>, next: HttpHandler) {
        this.localStorageService.removeToken();

        return this.authService.getClientToken().pipe(
            switchMap(token => {
                this.localStorageService.setToken(token.access_token);
                const authToken = this.localStorageService.getToken();
                const headers = AuthUtility.addAuthHeaders(request.headers, authToken);

                const newRequest = request.clone({
                    headers
                });

                return next.handle(newRequest);
            })
        )
    }
}