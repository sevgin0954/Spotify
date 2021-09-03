import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Paging } from "../models/paging/paging";
import { PlailistTrack } from "../models/plailist-track/plailist-track";
import { Track } from "../models/track/track";
import { RouteConstants } from "../shared/constants/route-constants";
import { AuthUtility } from "../shared/utilities/auth-utility";
import { PaginationUtility } from "../shared/utilities/pagination-utility";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class SongService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    getSongs(trackId: string, limit: number, offset: number): Observable<Paging<PlailistTrack>> {
        const authToken = this.localStorageService.getApiToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addClientAuthHeaders(headers, authToken);

        let params = new HttpParams();
        params = PaginationUtility.addPaginationParams(params, limit, offset);

        return this.http.get<Paging<PlailistTrack>>(`${RouteConstants.BASE}/playlists/${trackId}/tracks`, {
            headers,
            params
        });
    }

    getLikedSongs(): Observable<Paging<Track>> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);

        return this.http.get(`${RouteConstants.BASE}/me/tracks`, {
            headers
        }).pipe(
            map<any, Paging<Track>>(data => {
                data.items = data.items.map(i => i.track)
                return data;
            })
        )
    }

    getLikedSongsByIds(trackIds: string[]): Observable<boolean[]> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);

        let params = new HttpParams();
        params = params.set('ids', trackIds.join(','));

        return this.http.get<boolean[]>(`${RouteConstants.BASE}/me/tracks/contains`, {
            headers, params
        });
    }

    likeSong(songId: string): Observable<void> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);
        headers = headers.set('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.set('ids', songId);

        return this.http.put<void>(`${RouteConstants.BASE}/me/tracks`, {}, {
            headers, params
        });
    }

    dislikeSong(songId: string): Observable<void> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);
        headers = headers.set('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.set('ids', songId);

        return this.http.delete<void>(`${RouteConstants.BASE}/me/tracks`, {
            headers, params
        });
    }
}