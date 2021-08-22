import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SavedAlbum } from "../models/album/saved-album";
import { Paging } from "../models/paging/paging";
import { RouteConstants } from "../shared/constants/route-constants";
import { AuthUtility } from "../shared/utilities/auth-utility";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
})
export class UserAlbumsService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    getSavedAlbums(): Observable<Paging<SavedAlbum>> {
        const authToken = this.localStorageService.getToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addApiAuthHeaders(headers, authToken);

        return this.http.get<Paging<SavedAlbum>>(`${RouteConstants.BASE}/me/albums`, {
            headers
        });
    }
}