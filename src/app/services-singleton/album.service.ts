import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";
import { SimplifiedAlbum } from "../models/album/simplified-album";
import { Paging } from "../models/paging/paging";
import { Track } from "../models/track/track";
import { PaginationUtility } from "../shared/utilities/pagination-utility";
import { HeadersService } from "./headers.service";

@Injectable({
    providedIn: 'root'
})
export class AlbumService {

    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ) { }

    getById(id: string): Observable<SimplifiedAlbum> {
        const headers = this.headersService.getClientHeaders();

        return this.http.get<SimplifiedAlbum>(`https://api.spotify.com/v1/albums/${id}`, {
            headers
        });
    }

    getTracks(albumId: string, offset: number, limit: number): Observable<Paging<Track>> {
        const headers = this.headersService.getClientHeaders();

        let params = new HttpParams();
        params = PaginationUtility.addPaginationParams(params, limit, offset);

        return this.http.get<SimplifiedAlbum>(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            headers, params
        }).pipe(
            pluck('tracks')
        );
    }
}