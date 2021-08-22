import { Playlist } from "../models/playlist/playlist";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Paging } from "../models/paging/paging";
import { map } from "rxjs/operators";
import { Category } from "../shared/enums/category";
import { RouteConstants } from "../shared/constants/route-constants";
import { AuthHeaderService } from "./auth-headers.service";

@Injectable({
    providedIn: 'root'
})
export class PlaylistService {
    constructor(
        private http: HttpClient,
        private authHeaderService: AuthHeaderService
    ) { }

    getByCategory(category: Category, limit: number, offset: number): Observable<Paging<Playlist>> {
        let headers = new HttpHeaders();
        headers = this.authHeaderService.addApiAuthHeaders(headers);

        let params = new HttpParams();
        params = this.addPaginationParams(params, limit, offset);

        const categoryName = Category[category].toLowerCase()
        return this.http.get<Paging<Playlist>>(`${RouteConstants.BASE}/browse/categories/${categoryName}/playlists`, 
        { headers, params }).pipe(
            map<any, Paging<Playlist>>(data => data.playlists)
        );
    }

    getFutured(limit: number, offset: number): Observable<Paging<Playlist>> {
        let headers = new HttpHeaders();
        headers = this.authHeaderService.addApiAuthHeaders(headers);

        let params = new HttpParams();
        params = this.addPaginationParams(params, limit, offset);

        return this.http.get<Paging<Playlist>>(`${RouteConstants.BASE}/browse/featured-playlists`, 
        { headers, params }).pipe(
            map<any, Paging<Playlist>>(data => data.playlists)
        );
    }

    getById(id: string): Observable<Playlist> {
        return this.http.get<Playlist>(`${RouteConstants.BASE}/playlists/${id}`);
    }

    // TODO: Reuse
    private addPaginationParams(params: HttpParams, limit: number, offset: number): HttpParams {
        params = params.set('limit', limit.toString());
        params = params.set('offset', offset.toString());

        return params;
    }
}