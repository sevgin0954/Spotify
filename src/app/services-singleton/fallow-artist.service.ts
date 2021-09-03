import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RouteConstants } from "../shared/constants/route-constants";
import { HeadersService } from "./headers.service";

@Injectable({
    providedIn: "root"
})
export class FallowArtistService {
    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ) { }

    checkIfCurrentUserIsFallowing(artistId: string): Observable<boolean> {
        const headers = this.headersService.getUserHeaders();

        const params = this.getParams(artistId);

        return this.http.get<boolean>(`${RouteConstants.BASE}/me/following/contains`, {
            headers, params
        }).pipe(
            map(data => data[0])
        );
    }

    fallow(artistId: string): Observable<void> {
        let headers = this.headersService.getUserHeaders();
        headers = headers.set('Content-Type', 'application/json');

        const params = this.getParams(artistId);

        const body = {
            ids: [artistId]
        };

        return this.http.put<void>(`${RouteConstants.BASE}/me/following`, JSON.stringify(body), {
            headers, params
        });
    }

    unfallow(artistId: string): Observable<void> {
        // TODO: Reuse
        let headers = this.headersService.getUserHeaders();
        headers = headers.set('Content-Type', 'application/json');

        const params = this.getParams(artistId);

        return this.http.delete<void>(`${RouteConstants.BASE}/me/following`, {
            headers, params
        });
    }

    private getParams(artistId: string): HttpParams {
        let params = new HttpParams();
        params = params.set('type', 'artist');
        params = params.set('ids', artistId);

        return params;
    }
}