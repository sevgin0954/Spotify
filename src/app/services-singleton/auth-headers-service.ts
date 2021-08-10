import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthHeaderService {
    constructor(
        private localStorageService: LocalStorageService
    ) { }

    addApiAuthHeaders(headers: HttpHeaders): HttpHeaders {
        const authorizationToken = this.localStorageService.getToken();
        if (authorizationToken) {
            headers = headers.set('Authorization', `Bearer ${authorizationToken}`);
        }

        return headers;
    }
}