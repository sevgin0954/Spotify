import { Playlist } from "../models/playlist/playlist";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Paging } from "../models/paging/paging";
import { map } from "rxjs/operators";
import { Category } from "../shared/enums/category";
import { RouteConstants } from "../shared/constants/route-constants";
import { PaginationUtility } from "../shared/utilities/pagination-utility";
import { HeadersService } from "./headers.service";
import { PageArguments } from "../shared/page-arguments";

@Injectable({
    providedIn: 'root'
})
export class PlaylistService {
    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ) { }

    getByCategory(category: Category, pageArgs: PageArguments): Observable<Paging<Playlist>> {
        const headers = this.headersService.getClientHeaders();

        let params = new HttpParams();
        params = PaginationUtility.addPaginationParams(params, pageArgs);

        const categoryName = Category[category].toLowerCase()
        return this.http.get<Paging<Playlist>>(`${RouteConstants.BASE}/browse/categories/${categoryName}/playlists`, 
        { headers, params }).pipe(
            map<any, Paging<Playlist>>(data => data.playlists)
        );
    }

    getFutured(pageArgs: PageArguments): Observable<Paging<Playlist>> {
        const headers = this.headersService.getClientHeaders();

        let params = new HttpParams();
        params = PaginationUtility.addPaginationParams(params, pageArgs);

        return this.http.get<Paging<Playlist>>(`${RouteConstants.BASE}/browse/featured-playlists`, 
        { headers, params }).pipe(
            map<any, Paging<Playlist>>(data => data.playlists)
        );
    }

    getById(id: string): Observable<Playlist> {
        const headers = this.headersService.getClientHeaders();

        return this.http.get<Playlist>(`${RouteConstants.BASE}/playlists/${id}`, {
            headers
        });
    }
}