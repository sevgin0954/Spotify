import { Fallower } from "../fallower/fallower";
import { Image } from "../image/image";

export interface Artist {
    followers: Fallower,
    genres: string[],
    href: string,
    id: string,
    images: Image[],
    name: string,
    // The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular.
    popularity: number,
    type: string,
    uri: string
}