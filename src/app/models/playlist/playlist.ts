import { Image } from "../image/image";
import { PlailistTrack } from "../plailist-track/plailist-track";
import { User } from "../user/user";

export interface Playlist {
    // true if the owner allows other users to modify the playlist.
    collaborative: boolean,
    description: string,
    external_urls: string,
    href: string,
    id: string,
    images: Image[],
    name: string,
    owner: User,
    public: boolean,
    snapshot_id: string,
    tracks: PlailistTrack[],
    type: string,
    uri: string
}