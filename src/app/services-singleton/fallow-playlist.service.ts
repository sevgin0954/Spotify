import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { MainConstants } from "../shared/constants/main-constants";
import { RouteConstants } from "../shared/constants/route-constants";
import { AuthUtility } from "../shared/utilities/auth-utility";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class FallowPlaylistService {
    constructor(
        private localStorageService: LocalStorageService,
        private http: HttpClient
    ) { }

    checkIfUserIsFallowingPlaylist(playlistId: string, userId: string): Observable<boolean> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addAuthHeaders(headers, authToken);

        headers = headers.set(MainConstants.USER_AUTHORIZATION_REQUIRED_HEADER, '');

        let params = new HttpParams();
        params = params.set('ids', userId);

        return this.http.get<boolean>(`${RouteConstants.BASE}/playlists/${playlistId}/followers/contains`, {
            headers, params
        }).pipe(
            map(data => data[0])
        );
    }

    fallowPlaylist(playlistId: string): Observable<void> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addAuthHeaders(headers, authToken);
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set(MainConstants.USER_AUTHORIZATION_REQUIRED_HEADER, '');

        return this.http.put<void>(`${RouteConstants.BASE}/playlists/${playlistId}/followers`, {}, {
            headers
        })
    }

    unfallow(playlistId: string): Observable<void> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addAuthHeaders(headers, authToken);
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set(MainConstants.USER_AUTHORIZATION_REQUIRED_HEADER, '');

        return this.http.delete<void>(`${RouteConstants.BASE}/playlists/${playlistId}/followers`, {
            headers
        })
    }
}