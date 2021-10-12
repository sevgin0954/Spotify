import { Injectable } from "@angular/core";
import { Track } from "src/app/models/track/track";

@Injectable()
export class DisplayService {
    getDurationString(miliseconds: number): string {
        const minutes = Math.floor(miliseconds / 60000);
        const seconds = Number.parseInt(((miliseconds % 60000) / 1000).toFixed(0));
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    getReleasedYear(songIndex: number, tracks: Track[], separator: string): string {
        const releasedDate = tracks[songIndex].album.release_date;
        return releasedDate.split(separator)[0];
    }

    getReleasedMonthAndDay(songIndex: number, tracks: Track[], separator: string): string {
        const releasedDate = tracks[songIndex].album.release_date;
        const dateParts = releasedDate.split(separator).filter(p => p !== undefined);
        const mothAndDayPart = dateParts.filter((p, i) => i !== 0);

        return mothAndDayPart.join(separator);
    }
}