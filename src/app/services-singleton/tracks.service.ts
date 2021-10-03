import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Paging } from "../models/paging/paging";
import { PlailistTrack } from "../models/plailist-track/plailist-track";
import { Track } from "../models/track/track";
import { RouteConstants } from "../shared/constants/route-constants";
import { PageArguments } from "../shared/page-arguments";
import { PaginationUtility } from "../shared/utilities/pagination-utility";
import { ArrayValidator } from "../shared/validators/array-validator";
import { StringValidator } from "../shared/validators/string-validator";
import { HeadersService } from "./headers.service";

@Injectable({
    providedIn: 'root'
})
export class TracksService {
    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ) { }

    getSongs(trackId: string, pageArgs: PageArguments): Observable<Paging<PlailistTrack>> {
        StringValidator.validateString(trackId, 'trackId');

        const headers = this.headersService.getClientHeaders();

        let params = new HttpParams();
        params = PaginationUtility.addPaginationParams(params, pageArgs);

        return this.http.get<Paging<PlailistTrack>>(`${RouteConstants.BASE}/playlists/${trackId}/tracks`, {
            headers,
            params
        });
    }

    getLikedSongs(): Observable<Paging<Track>> {
        const headers = this.headersService.getUserHeaders();

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
        ArrayValidator.validateArray(trackIds, 'trackIds');
        ArrayValidator.notEmptyElements(trackIds, 'trackIds');

        const headers = this.headersService.getUserHeaders();

        let params = new HttpParams();
        params = params.set('ids', trackIds.join(','));

        return this.http.get<boolean[]>(`${RouteConstants.BASE}/me/tracks/contains`, {
            headers, params
        });
    }

    likeSong(songId: string): Observable<void> {
        StringValidator.validateString(songId, 'songId');

        const options = this.getOptionsForChangingLikeState(songId);

        return this.http.put<void>(`${RouteConstants.BASE}/me/tracks`, {}, options);
    }

    dislikeSong(songId: string): Observable<void> {
        StringValidator.validateString(songId, 'songId');

        const options = this.getOptionsForChangingLikeState(songId);

        return this.http.delete<void>(`${RouteConstants.BASE}/me/tracks`, options);
    }

    private getOptionsForChangingLikeState(songId: string): { headers: HttpHeaders, params: HttpParams } {
        let headers = this.headersService.getUserHeaders();
        headers = headers.set('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.set('ids', songId);

        return {
            headers,
            params
        };
    }
}