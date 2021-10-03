import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RouteConstants } from "../shared/constants/route-constants";
import { StringValidator } from "../shared/validators/string-validator";
import { HeadersService } from "./headers.service";

@Injectable({
    providedIn: 'root'
})
export class FallowPlaylistService {
    constructor(
        private headersService: HeadersService,
        private http: HttpClient
    ) { }

    checkIfUserIsFallowingPlaylist(playlistId: string, userId: string): Observable<boolean> {
        StringValidator.validateString(playlistId, 'playlistId');
        StringValidator.validateString(userId, 'userId');

        const headers = this.headersService.getUserHeaders();

        let params = new HttpParams();
        params = params.set('ids', userId);

        return this.http.get<boolean>(`${RouteConstants.BASE}/playlists/${playlistId}/followers/contains`, {
            headers, params
        }).pipe(
            map(data => data[0])
        );
    }

    fallow(playlistId: string): Observable<void> {
        StringValidator.validateString(playlistId, 'playlistId');

        let headers = this.headersService.getUserHeaders();
        headers = headers.set('Content-Type', 'application/json');

        return this.http.put<void>(`${RouteConstants.BASE}/playlists/${playlistId}/followers`, {}, {
            headers
        })
    }

    unfallow(playlistId: string): Observable<void> {
        StringValidator.validateString(playlistId, 'playlistId');

        let headers = this.headersService.getUserHeaders();
        headers = headers.set('Content-Type', 'application/json');

        return this.http.delete<void>(`${RouteConstants.BASE}/playlists/${playlistId}/followers`, {
            headers
        })
    }
}