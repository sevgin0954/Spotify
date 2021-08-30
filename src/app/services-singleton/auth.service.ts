import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Token } from "../models/token/token";
import { MainConstants } from "../shared/constants/main-constants";
import { RouteConstants } from "../shared/constants/route-constants";

const BASE_ROUTE: string = 'https://accounts.spotify.com';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    getClientToken(): Observable<Token> {
        return this.http.post<Token>(`${BASE_ROUTE}/api/token`, 'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(`${MainConstants.CLIENT_ID}:${MainConstants.CLIENT_SECRET}`)
            }
        });
    }

    getUserToken(code: string, redirectUri: string): Observable<Token> {
        const body = `grant_type=${'authorization_code'}&code=${code}&redirect_uri=${redirectUri}`;
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(`${MainConstants.CLIENT_ID}:${MainConstants.CLIENT_SECRET}`)
        };

        return this.http.post<Token>(`${BASE_ROUTE}/api/token`, body, {
            headers
        });
    }
}