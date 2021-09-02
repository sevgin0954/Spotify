import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ArtistService } from "src/app/services-singleton/artist.service";
import { Artist } from "src/app/models/artist/artist";

@Injectable({
    providedIn: 'root'
})
export class ArtistResolver implements Resolve<Artist> {
    
    constructor(
        private artistService: ArtistService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Artist | Observable<Artist> | Promise<Artist> {
        const artistId = route.params['id'];
        
        return this.artistService.getById(artistId);
    }

}