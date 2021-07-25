import { Playlist } from "../models/playlist/playlist";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { MainConstants } from "../shared/constants/main-constants";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: 'root'
  })
export class PlaylistService {
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    getByCategory(): Observable<Playlist[]> {
        const headers = new HttpHeaders();

        const authorizationToken = this.localStorageService.getToken();
        if (authorizationToken) {
            headers.set('Authorization', authorizationToken);
        }
        return this.http.get<Playlist[]>(`https://api.spotify.com/v1/browse/categories/${'pop'}/playlists`, { headers });
    }
}