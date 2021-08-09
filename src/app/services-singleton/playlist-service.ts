import { Playlist } from "../models/playlist/playlist";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { Paging } from "../models/paging/paging";
import { map } from "rxjs/operators";
import { Category } from "../shared/enums/category";

@Injectable({
    providedIn: 'root'
})
export class PlaylistService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    getByCategory(category: Category, limit: number): Observable<Paging<Playlist>> {
        let headers = new HttpHeaders();
        headers = this.tryAddAuthHeader(headers);

        let params = new HttpParams();
        params = params.set('limit', limit.toString());

        const categoryName = Category[category].toLowerCase()
        return this.http.get<Paging<Playlist>>(`https://api.spotify.com/v1/browse/categories/${categoryName}/playlists`, 
        { headers, params }).pipe(
            map<any, Paging<Playlist>>(data => data.playlists)
        );
    }

    getFutured(limit: number): Observable<Paging<Playlist>> {
        let headers = new HttpHeaders();
        headers = this.tryAddAuthHeader(headers);

        let params = new HttpParams();
        params = params.set('limit', limit.toString());

        return this.http.get<Paging<Playlist>>(`https://api.spotify.com/v1/browse/featured-playlists`, 
        { headers, params }).pipe(
            map<any, Paging<Playlist>>(data => data.playlists)
        );
    }

    private tryAddAuthHeader(headers: HttpHeaders): HttpHeaders {
        const authorizationToken = this.localStorageService.getToken();
        if (authorizationToken) {
            headers = headers.set('Authorization', `Bearer ${authorizationToken}`);
        }

        return headers;
    }
}