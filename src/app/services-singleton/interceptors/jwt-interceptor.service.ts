import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { LocalStorageService } from "../local-storage.service";
import { AuthService } from "../auth.service";
import { catchError, switchMap } from "rxjs/operators";
import { AuthUtility } from "src/app/shared/utilities/auth-utility";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        return next.handle(request).pipe(
            catchError(error => {
                // Token is invalid
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.refreshToken(request, next);
                }

                return throwError(error);
            })
        );
    }

    refreshToken(request: HttpRequest<any>, next: HttpHandler) {
        this.localStorageService.removeToken();
        
        return this.authService.getClientToken().pipe(
            switchMap(token => {
                this.localStorageService.setToken(token.access_token);
                const authToken = this.localStorageService.getToken();
                const headers = AuthUtility.addApiAuthHeaders(request.headers, authToken);

                const newRequest = request.clone({
                    headers
                });

                return next.handle(newRequest);
            })
        )
    }
}