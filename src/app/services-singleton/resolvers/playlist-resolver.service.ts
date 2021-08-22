import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Playlist } from "src/app/models/playlist/playlist";
import { PlaylistService } from "../playlist.service";

@Injectable({
    providedIn: 'root'
})
export class PlaylistResolverService implements Resolve<Playlist> {
    constructor(
        private playlistService: PlaylistService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Playlist | Observable<Playlist> | Promise<Playlist> {
        const id = route.params['id'];

        return this.playlistService.getById(id);
    }
}