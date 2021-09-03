import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthUtility } from "../shared/utilities/auth-utility";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class HeadersService {
    constructor(
        private localStorageService: LocalStorageService
    ) { }

    getUserHeaders(): HttpHeaders {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);

        return headers;
    }

    getClientHeaders(): HttpHeaders {
        const authToken = this.localStorageService.getApiToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addClientAuthHeaders(headers, authToken);

        return headers;
    }
}