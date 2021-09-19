import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RouteConstants } from "../shared/constants/route-constants";
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
        let headers = this.headersService.getUserHeaders();
        headers = headers.set('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.set('ids', albumId);

        return this.http.put<void>(`${RouteConstants.BASE}/me/albums`, {}, {
            headers, params
        });
    }

    unfallow(albumId: string): Observable<void> {
        let headers = this.headersService.getUserHeaders();
        headers = headers.set('Content-Type', 'application/json');

        let params = new HttpParams();
        params = params.set('ids', albumId);

        return this.http.delete<void>(`${RouteConstants.BASE}/me/albums`, {
            headers, params
        });
    }
}