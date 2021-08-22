import { Image } from "../image/image";

export interface SimplifiedAlbumObject {
    album_group: string,
    album_type: string,
    artists,
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