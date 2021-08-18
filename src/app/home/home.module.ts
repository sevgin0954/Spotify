import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CategoryPlaylistsShortModule } from "../category-playlists-short/category-playlists-short.module";
import { HomeComponent } from "./home/home.component";

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        CategoryPlaylistsShortModule
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule { }