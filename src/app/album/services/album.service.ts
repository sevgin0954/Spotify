import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";
import { SimplifiedAlbum } from "src/app/models/album/simplified-album";
import { Paging } from "src/app/models/paging/paging";
import { Track } from "src/app/models/track/track";
import { HeadersService } from "src/app/services-singleton/headers.service";
import { LimitConstants } from "src/app/shared/constants/limit-constants";
import { RouteConstants } from "src/app/shared/constants/route-constants";
import { PageArguments } from "src/app/shared/page-arguments";
import { PaginationUtility } from "src/app/shared/utilities/pagination-utility";
import { NumberValidator } from "src/app/shared/validators/number-validator";
import { ObjectValidator } from "src/app/shared/validators/object-validator";
import { StringValidator } from "src/app/shared/validators/string-validator";

@Injectable()
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
        params = PaginationUtility.addPaginationParams(params, pageArguments);

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