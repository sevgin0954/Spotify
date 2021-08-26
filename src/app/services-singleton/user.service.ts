import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user/user";
import { MainConstants } from "../shared/constants/main-constants";
import { RouteConstants } from "../shared/constants/route-constants";
import { AuthUtility } from "../shared/utilities/auth-utility";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(
        private localStorageService: LocalStorageService,
        private http: HttpClient
    ) { }

    getUser(): Observable<User> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addAuthHeaders(headers, authToken);
        headers = headers.set(MainConstants.USER_AUTHORIZATION_REQUIRED_HEADER, '');

        return this.http.get<User>(`${RouteConstants.BASE}/me`, {
            headers
        });
    }
}