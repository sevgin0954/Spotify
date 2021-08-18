import { Observable } from "rxjs";
import { Paging } from "../models/paging/paging";
import { Playlist } from "../models/playlist/playlist";

export type loadPlaylistsCallback = () => Observable<Paging<Playlist>>;