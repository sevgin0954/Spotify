import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Track } from "src/app/models/track/track";
import { ArtistService } from "../artist.service";

@Injectable({
    providedIn: 'root'
})
export class ArtistTopTracksResolver implements Resolve<Track[]> {
    constructor(
        private artistService: ArtistService
    ) { }

    // TODO: Remove unnecessary resolvers
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Track[] | Observable<Track[]> | Promise<Track[]> {
        const artistId = route.params['id'];
        
        return this.artistService.getTopTracks(artistId);
    }

}