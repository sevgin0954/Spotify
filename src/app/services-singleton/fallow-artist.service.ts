import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RouteConstants } from "../shared/constants/route-constants";
import { StringValidator } from "../shared/validators/string-validator";
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
        StringValidator.validateString(artistId, 'artistId');
        
        const headers = this.headersService.getUserHeaders();

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
        StringValidator.validateString(artistId, 'artistId');

        const options = this.getOptionsForChangingFallowingState(artistId);

        const body = {
            ids: [artistId]
        };

        return this.http.put<void>(`${RouteConstants.BASE}/me/following`, JSON.stringify(body), options);
    }

    unfallow(artistId: string): Observable<void> {
        StringValidator.validateString(artistId, 'artistId');
        
        const options = this.getOptionsForChangingFallowingState(artistId);

        return this.http.delete<void>(`${RouteConstants.BASE}/me/following`, options);
    }

    private getOptionsForChangingFallowingState(artistId: string): { headers: HttpHeaders, params: HttpParams } {
        let headers = this.headersService.getUserHeaders();
        headers = headers.set('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.set('type', 'artist');
        params = params.set('ids', artistId);

        return {
            headers, params
        };
    }
}