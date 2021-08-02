import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PlaylistsModule } from "../playlists/playlists.module";
import { HomeComponent } from "./home/home.component";

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        PlaylistsModule
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule { }