import { HttpHeaders } from "@angular/common/http";

export class AuthUtility {
    static addApiAuthHeaders(headers: HttpHeaders, authorizationToken: string | null): HttpHeaders {
        if (authorizationToken) {
            headers = headers.set('Authorization', `Bearer ${authorizationToken}`);
        }

        return headers;
    }
}