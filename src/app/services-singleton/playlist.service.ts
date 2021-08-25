import { Playlist } from "../models/playlist/playlist";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Paging } from "../models/paging/paging";
import { map } from "rxjs/operators";
import { Category } from "../shared/enums/category";
import { RouteConstants } from "../shared/constants/route-constants";
import { PaginationUtility } from "../shared/utilities/pagination-utility";
import { LocalStorageService } from "./local-storage.service";
import { AuthUtility } from "../shared/utilities/auth-utility";

@Injectable({
    providedIn: 'root'
})
export class PlaylistService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    getByCategory(category: Category, limit: number, offset: number): Observable<Paging<Playlist>> {
        const authToken = this.localStorageService.getToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addAuthHeaders(headers, authToken);

        let params = new HttpParams();
        params = PaginationUtility.addPaginationParams(params, limit, offset);

        const categoryName = Category[category].toLowerCase()
        return this.http.get<Paging<Playlist>>(`${RouteConstants.BASE}/browse/categories/${categoryName}/playlists`, 
        { headers, params }).pipe(
            map<any, Paging<Playlist>>(data => data.playlists)
        );
    }

    getFutured(limit: number, offset: number): Observable<Paging<Playlist>> {
        const authToken = this.localStorageService.getToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addAuthHeaders(headers, authToken);

        let params = new HttpParams();
        params = PaginationUtility.addPaginationParams(params, limit, offset);

        return this.http.get<Paging<Playlist>>(`${RouteConstants.BASE}/browse/featured-playlists`, 
        { headers, params }).pipe(
            map<any, Paging<Playlist>>(data => data.playlists)
        );
    }

    getById(id: string): Observable<Playlist> {
        return this.http.get<Playlist>(`${RouteConstants.BASE}/playlists/${id}`);
    }
}