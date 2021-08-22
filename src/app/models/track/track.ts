import { SimplifiedAlbum } from "../album/simplified-album";
import { Artist } from "../artist/artist";

export interface Track {
    album: SimplifiedAlbum,
    artists: Artist[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    href: string,
    id: string,
    is_local: boolean,
    is_playable: boolean,
    name: string,
    // The value will be between 0 and 100, with 100 being the most popular.
    popularity: number,
    preview_url: string,
    // The number of the track. If an album has several discs, the track number is the number on the specified disc.
    track_number: number,
    type: string,
    uri: string
}