import { HttpHeaders } from "@angular/common/http";
import { MainConstants } from "../constants/main-constants";

export class AuthUtility {
    static addClientAuthHeaders(headers: HttpHeaders, authorizationToken: string | null): HttpHeaders {
        if (authorizationToken) {
            headers = headers.set('Authorization', `Bearer ${authorizationToken}`);
        }

        return headers;
    }

    static addUserAuthHeaders(headers: HttpHeaders, authorizationToken: string | null): HttpHeaders {
        if (authorizationToken) {
            headers = headers.set('Authorization', `Bearer ${authorizationToken}`);
        }

        headers = headers.set(MainConstants.USER_AUTHORIZATION_REQUIRED_HEADER, '');

        return headers;
    }
}