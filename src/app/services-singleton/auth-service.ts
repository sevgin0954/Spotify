import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Token } from "../models/token/token";
import { MainConstants } from "../shared/constants/main-constants";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    getClientToken(): Observable<Token> {
        return this.http.post<Token>('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(`${MainConstants.CLIENT_ID}:${MainConstants.CLIENT_SECRET}`)
            }
        });
    }
}