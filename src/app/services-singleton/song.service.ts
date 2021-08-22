import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Paging } from "../models/paging/paging";
import { PlailistTrack } from "../models/plailist-track/plailist-track";
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
        const authToken = this.localStorageService.getToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addApiAuthHeaders(headers, authToken);

        let params = new HttpParams();
        params = PaginationUtility.addPaginationParams(params, limit, offset);

        return this.http.get<Paging<PlailistTrack>>(`${RouteConstants.BASE}/playlists/${trackId}/tracks`, {
            headers,
            params
        });
    }
}