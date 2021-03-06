import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";
import { SimplifiedAlbum } from "src/app/models/album/simplified-album";
import { Artist } from "src/app/models/artist/artist"
import { Paging } from "src/app/models/paging/paging";
import { Track } from "src/app/models/track/track";
import { HeadersService } from "src/app/services-singleton/headers.service";
import { RouteConstants } from "src/app/shared/constants/route-constants";
import { RegionCode } from "src/app/shared/enums/region-code";
import { PageArguments } from "src/app/shared/page-arguments";
import { ObjectValidator } from "src/app/shared/validators/object-validator";
import { StringValidator } from "src/app/shared/validators/string-validator";

@Injectable()
export class ArtistService {
    constructor (
        private http: HttpClient,
        private headersService: HeadersService
    ) { }
    
    getById(id: string): Observable<Artist> {
        StringValidator.validateString(id, 'id');

        const headers = this.headersService.getClientHeaders();
        
        return this.http.get<Artist>(`${RouteConstants.BASE}/artists/${id}`, {
            headers
        });
    }

    getTopTracks(artistId: string, regionCode: RegionCode): Observable<Track[]> {
        this.validateGetTopTracksArguments(artistId, regionCode);

        const headers = this.headersService.getClientHeaders();

        let params = new HttpParams();

        params = params.set('market', RegionCode[regionCode]);

        return this.http.get<Track[]>(`${RouteConstants.BASE}/artists/${artistId}/top-tracks`, {
            headers, params
        }).pipe(
            pluck('tracks')
        );
    }

    private validateGetTopTracksArguments(artistId: string, regionCode: RegionCode): void {
        StringValidator.validateString(artistId, 'artistId');
        ObjectValidator.notNullOrUndefinied(regionCode, 'regionCode');
    }

    getAlbums(artistId: string, pageArgs: PageArguments): Observable<Paging<SimplifiedAlbum>> {
        this.validateGetAlbumsArguments(artistId, pageArgs);

        const headers = this.headersService.getClientHeaders();

        let params = new HttpParams();
        params = params.set('limit', pageArgs.limit.toString());
        params = params.set('offset', pageArgs.offset.toString());

        return this.http.get<Paging<SimplifiedAlbum>>(`${RouteConstants.BASE}/artists/${artistId}/albums`, {
            headers, params
        });
    }

    private validateGetAlbumsArguments(artistId: string, pageArgs: PageArguments): void {
        StringValidator.validateString(artistId, 'artistId');
        ObjectValidator.notNullOrUndefinied(pageArgs, 'pageArgs');
    }

    getRelatedArtists(artistId: string): Observable<Artist[]> {
        StringValidator.validateString(artistId, 'artistId');

        const headers = this.headersService.getClientHeaders();

        return this.http.get<Artist[]>(`${RouteConstants.BASE}/artists/${artistId}/related-artists`, {
            headers
        }).pipe(
            pluck('artists')
        );
    }
}