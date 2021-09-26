import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { SavedAlbum } from "../../models/album/saved-album";
import { Paging } from "../../models/paging/paging";
import { Playlist } from "../../models/playlist/playlist";
import { RouteConstants } from "../../shared/constants/route-constants";
import { AuthUtility } from "../../shared/utilities/auth-utility";
import { LocalStorageService } from "../../services-singleton/local-storage.service";
import { Injectable } from "@angular/core";
import { Artist } from "src/app/models/artist/artist";
import { pluck } from "rxjs/operators";

@Injectable()
export class UserLibraryService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    getSavedAlbums(): Observable<Paging<SavedAlbum>> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);

        return this.http.get<Paging<SavedAlbum>>(`${RouteConstants.BASE}/me/albums`, {
            headers
        });
    }

    getSavedPlaylists(): Observable<Paging<Playlist>> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);

        return this.http.get<Paging<Playlist>>(`${RouteConstants.BASE}/me/playlists`, {
            headers
        });
    }

    getSavedArtists(): Observable<Paging<Artist>> {
        const authToken = this.localStorageService.getUserToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addUserAuthHeaders(headers, authToken);
        
        let params = new HttpParams();
        params = params.set('type', 'artist');

        return this.http.get<Paging<Artist>>(`${RouteConstants.BASE}/me/following`, {
            headers,
            params
        }).pipe(
            pluck('artists')
        );
    }
}