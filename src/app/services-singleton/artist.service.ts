import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Artist } from "src/app/models/artist/artist"
import { RouteConstants } from "src/app/shared/constants/route-constants";
import { HeadersService } from "./headers.service";

@Injectable({
    providedIn: "root"
})
export class ArtistService {
    constructor (
        private http: HttpClient,
        private headersService: HeadersService
    ) { }
    
    getById(id: string): Observable<Artist> {
        const headers = this.headersService.getClientHeaders();
        
        return this.http.get<Artist>(`${RouteConstants.BASE}/artists/${id}`, {
            headers
        });
    }
}