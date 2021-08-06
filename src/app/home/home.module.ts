import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CategoryModule } from "../category/category.module";
import { PlaylistsModule } from "../playlists/playlists.module";
import { HomeComponent } from "./home/home.component";

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        CategoryModule
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule { }