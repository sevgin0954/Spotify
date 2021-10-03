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
export class FallowAlbumService {

    constructor(
        private headersService: HeadersService,
        private http: HttpClient
    ) { }

    checkIfUserIsFallowingAlbum(albumId: string): Observable<boolean> {
        StringValidator.validateString(albumId, 'albumId');

        const headers = this.headersService.getUserHeaders();

        let params = new HttpParams();
        params = params.set('ids', albumId);

        return this.http.get<boolean>(`${RouteConstants.BASE}/me/albums/contains`, {
            headers, params
        }).pipe(
            map(data => data[0])
        );
    }

    fallow(albumId: string): Observable<void> {
        StringValidator.validateString(albumId, 'albumId');

        const options = this.getOptionsForChangingFallowingState(albumId);

        return this.http.put<void>(`${RouteConstants.BASE}/me/albums`, {}, options);
    }

    unfallow(albumId: string): Observable<void> {
        StringValidator.validateString(albumId, 'albumId');
        
        const options = this.getOptionsForChangingFallowingState(albumId);

        return this.http.delete<void>(`${RouteConstants.BASE}/me/albums`, options);
    }

    private getOptionsForChangingFallowingState(albumId: string): { headers: HttpHeaders, params: HttpParams } {
        let headers = this.headersService.getUserHeaders();
        headers = headers.set('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.set('ids', albumId);

        return {
            headers, params
        };
    }
}