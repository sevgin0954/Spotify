import { Track } from "../track/track";
import { User } from "../user/user";

export interface PlailistTrack {
    added_at: Date,
    added_by: User,
    // Whether this track or episode is a local file or not.
    is_local: boolean,
    track: Track
}