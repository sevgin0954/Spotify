import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Paging } from "../models/paging/paging";
import { PlailistTrack } from "../models/plailist-track/plailist-track";
import { RouteConstants } from "../shared/constants/route-constants";
import { AuthHeaderService } from "./auth-headers.service";

@Injectable({
    providedIn: 'root'
})
export class SongService {
    constructor(
        private http: HttpClient,
        private authHeaderService: AuthHeaderService
    ) { }

    getSongs(trackId: string, limit: number, offset: number): Observable<Paging<PlailistTrack>> {
        let headers = new HttpHeaders();
        headers = this.authHeaderService.addApiAuthHeaders(headers);

        let params = new HttpParams();
        params = this.addPaginationParams(params, limit, offset);

        return this.http.get<Paging<PlailistTrack>>(`${RouteConstants.BASE}/playlists/${trackId}/tracks`, {
            headers,
            params
        });
    }

    // TODO: Reuse
    private addPaginationParams(params: HttpParams, limit: number, offset: number): HttpParams {
        params = params.set('limit', limit.toString());
        params = params.set('offset', offset.toString());

        return params;
    }
}