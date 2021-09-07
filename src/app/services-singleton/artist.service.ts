import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { pluck } from "rxjs/operators";
import { Artist } from "src/app/models/artist/artist"
import { RouteConstants } from "src/app/shared/constants/route-constants";
import { Track } from "../models/track/track";
import { HeadersService } from "./headers.service";

// TODO: Move to artist component after implemeneting lazy loading
@Injectable({
    providedIn: "root"
})
export class ArtistService {
    constructor (
        private http: HttpClient,
        private headersService: HeadersService
    ) { }
    
    getById(artistId: string): Observable<Artist> {
        const headers = this.headersService.getClientHeaders();
        
        return this.http.get<Artist>(`${RouteConstants.BASE}/artists/${artistId}`, {
            headers
        });
    }

    getTopTracks(artistId: string): Observable<Track[]> {
        const headers = this.headersService.getClientHeaders();

        let params = new HttpParams();
        // TODO: Get arket code dynamically
        params = params.set('market', 'BG');

        return this.http.get<Track[]>(`${RouteConstants.BASE}/artists/${artistId}/top-tracks`, {
            headers, params
        }).pipe(
            pluck('tracks')
        );
    }
}