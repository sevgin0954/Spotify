import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";
import { SimplifiedAlbum } from "../models/album/simplified-album";
import { Paging } from "../models/paging/paging";
import { Track } from "../models/track/track";
import { LimitConstants } from "../shared/constants/limit-constants";
import { RouteConstants } from "../shared/constants/route-constants";
import { PageArguments } from "../shared/page-arguments";
import { PaginationUtility } from "../shared/utilities/pagination-utility";
import { NumberValidator } from "../shared/validators/number-validator";
import { ObjectValidator } from "../shared/validators/object-validator";
import { StringValidator } from "../shared/validators/string-validator";
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
        StringValidator.validateString(id, 'id');

        const headers = this.headersService.getClientHeaders();

        return this.http.get<SimplifiedAlbum>(`${RouteConstants.BASE}/albums/${id}`, {
            headers
        });
    }

    getTracks(albumId: string, pageArguments: PageArguments): Observable<Paging<Track>> {
        this.validateGetTracksArguments(albumId, pageArguments);

        const headers = this.headersService.getClientHeaders();

        let params = new HttpParams();
        params = PaginationUtility.addPaginationParams(params, pageArguments.limit, pageArguments.offset);

        return this.http.get<SimplifiedAlbum>(`${RouteConstants.BASE}/albums/${albumId}/tracks`, {
            headers, params
        }).pipe(
            pluck('tracks')
        );
    }

    private validateGetTracksArguments(albumId: string, pageArguments: PageArguments): void {
        StringValidator.validateString(albumId, 'albumId');
        ObjectValidator.notNullOrUndefinied(pageArguments, 'pageArguments');
        NumberValidator.validateMax(pageArguments.limit, LimitConstants.ALBUM_TRACKS_MAX, 'pageArguments.limit');
    }
}