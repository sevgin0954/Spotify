import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SavedAlbum } from "../models/album/saved-album";
import { Paging } from "../models/paging/paging";
import { RouteConstants } from "../shared/constants/route-constants";

export class UserAlbumsService {
    constructor(private http: HttpClient) { }

    getSavedAlbums(): Observable<Paging<SavedAlbum>> {
        return this.http.get<Paging<SavedAlbum>>(`${RouteConstants.BASE}/me/albums`);
    }
}