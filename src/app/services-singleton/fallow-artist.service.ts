import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RouteConstants } from "../shared/constants/route-constants";
import { AuthUtility } from "../shared/utilities/auth-utility";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root"
})
export class FallowArtistService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    checkIfCurrentUserIsFallowing(artistId: string): Observable<boolean> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);

        let params = new HttpParams();
        params = params.set('type', 'artist');
        params = params.set('ids', artistId);

        return this.http.get<boolean>(`${RouteConstants.BASE}/me/following/contains`, {
            headers, params
        }).pipe(
            map(data => data[0])
        );
    }

    fallow(artistId: string): Observable<void> {
        // TODO: Reuse
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);
        headers = headers.set('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.set('type', 'artist');
        params = params.set('ids', artistId);

        const body = {
            ids: [artistId]
        };

        return this.http.put<void>(`${RouteConstants.BASE}/me/following`, JSON.stringify(body), {
            headers, params
        });
    }

    unfallow(artistId: string): Observable<void> {
        // TODO: Reuse
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);
        headers = headers.set('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.set('type', 'artist');
        params = params.set('ids', artistId);

        const body = {
            ids: [artistId]
        };

        return this.http.delete<void>(`${RouteConstants.BASE}/me/following`, {
            headers, params
        });
    }
}