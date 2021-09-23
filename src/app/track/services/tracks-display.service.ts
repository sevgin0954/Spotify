import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { concatMap, mergeMap } from "rxjs/operators";
import { Track } from "src/app/models/track/track";
import { LocalStorageService } from "src/app/services-singleton/local-storage.service";
import { TracksService } from "src/app/services-singleton/tracks.service";
import { isTracksLikedPage } from "../types";

@Injectable()
export class TracksDisplayService {
    private likedTracksStartIndex: number = 0;

    constructor(
        private songService: TracksService,
        private localStorageService: LocalStorageService
    ) { }

    // TODO: Refactor
    getIsTrackLiked(tracks: Track[]): Observable<isTracksLikedPage> {
        let result$;

        let partNumber = 1;
        const userToken = this.localStorageService.getUserToken();
        if (userToken) {
            for (let startIndex = this.likedTracksStartIndex; startIndex < tracks.length; startIndex += 50) {
                const endIndex = this.likedTracksStartIndex + 50 - 1;

                const currentPartTracks = tracks.slice(this.likedTracksStartIndex, endIndex);
                const currentPartTracksIds = currentPartTracks.map(t => t.id);

                if (result$ === undefined) {
                    result$ = this.songService.getLikedSongsByIds(currentPartTracksIds).pipe(
                        concatMap<boolean[], Observable<isTracksLikedPage>>(data => {
                            return of({
                                isTracksLikedItems: data,
                                partNumber: partNumber++
                            });
                        })
                    );
                }

                result$.pipe(
                    mergeMap(() => {
                        return this.songService.getLikedSongsByIds(currentPartTracksIds);
                    }),
                    concatMap<boolean[], Observable<isTracksLikedPage>>(data => {
                        return of({
                            isTracksLikedItems: data,
                            partNumber: partNumber++
                        });
                    })
                )
            }
        }
        else {
            result$ = of<isTracksLikedPage>({
                isTracksLikedItems: new Array(tracks.length).fill(false),
                partNumber: 1
            });
        }

        return result$;
    }

    tryMoveLoadedTrackLiked(
        isTrackLikedLoaded: boolean[], 
        isTrackLikedPages: isTracksLikedPage[],
        currentPart: number): number {
        isTrackLikedPages.forEach((currentPage, index) => {
            if (currentPage.partNumber >= currentPart) {
                isTrackLikedLoaded.push(...currentPage.isTracksLikedItems);

                isTrackLikedPages = isTrackLikedPages.splice(index, 1);
                currentPart++;
            }
        });

        return currentPart;
    }
}