import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Artist } from "src/app/models/artist/artist";
import { LocalStorageService } from "src/app/services-singleton/local-storage.service";
import { RouteConstants } from "src/app/shared/constants/route-constants";
import { AuthUtility } from "src/app/shared/utilities/auth-utility";

@Injectable({
    providedIn: "root"
})
export class ArtistService {
    constructor (
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }
    
    getById(id: string): Observable<Artist> {
        const authToken = this.localStorageService.getApiToken();
        let headers = new HttpHeaders();
        headers = AuthUtility.addClientAuthHeaders(headers, authToken);
        
        return this.http.get<Artist>(`${RouteConstants.BASE}/artists/${id}`, {
            headers
        });
    }
}