import { SimplifiedArtist } from "../artist/simplified-artist";
import { Image } from "../image/image";

export interface SimplifiedAlbum {
    album_group: string,
    album_type: string,
    artists: SimplifiedArtist[],
    available_markets: string[],
    href: string,
    id: string,
    images: Image[],
    name: string,
    release_date: string,
    // The precision with which release_date value is known: year , month , or day.
    release_date_precision: string,
    total_tracks: number,
    type: string,
    uri: string
}