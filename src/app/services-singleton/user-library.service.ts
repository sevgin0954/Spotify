import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SavedAlbum } from "../models/album/saved-album";
import { Paging } from "../models/paging/paging";
import { Playlist } from "../models/playlist/playlist";
import { MainConstants } from "../shared/constants/main-constants";
import { RouteConstants } from "../shared/constants/route-constants";
import { AuthUtility } from "../shared/utilities/auth-utility";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class UserLibraryService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    getSavedAlbums(): Observable<Paging<SavedAlbum>> {
        const authToken = this.localStorageService.getToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addAuthHeaders(headers, authToken);
        
        headers = headers.set(MainConstants.USER_AUTHORIZATION_REQUIRED_HEADER, '');

        return this.http.get<Paging<SavedAlbum>>(`${RouteConstants.BASE}/me/albums`, {
            headers
        });
    }

    getSavedPlaylists(): Observable<Paging<Playlist>> {
        const authToken = this.localStorageService.getToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addAuthHeaders(headers, authToken);

        headers = headers.set(MainConstants.USER_AUTHORIZATION_REQUIRED_HEADER, '');

        return this.http.get<Paging<Playlist>>(`${RouteConstants.BASE}/me/playlists`, {
            headers
        });
    }
}