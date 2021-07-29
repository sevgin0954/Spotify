import { Playlist } from "../models/playlist/playlist";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { Paging } from "../models/paging/paging";
import { map, tap } from "rxjs/operators";
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

        headers.set('limit', limit.toString());
        const authorizationToken = this.localStorageService.getToken();
        if (authorizationToken) {
            headers = headers.set('Authorization', `Bearer ${authorizationToken}`);
        }

        let params = new HttpParams();
        params = params.set('limit', limit.toString());

        const categoryName = Category[category].toLowerCase()
        return this.http.get<Paging<Playlist>>(`https://api.spotify.com/v1/browse/categories/${categoryName}/playlists`, 
        { headers, params }).pipe(
            map<any, Paging<Playlist>>(data => data.playlists)
        );
    }
}