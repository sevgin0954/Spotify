import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user/user";
import { RouteConstants } from "../shared/constants/route-constants";
import { HeadersService } from "./headers.service";

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(
        private headersService: HeadersService,
        private http: HttpClient
    ) { }

    getUser(): Observable<User> {
        const headers = this.headersService.getUserHeaders();

        return this.http.get<User>(`${RouteConstants.BASE}/me`, {
            headers
        });
    }
}