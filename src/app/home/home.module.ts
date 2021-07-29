import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TextModule } from "../text/text.module";
import { HomeComponent } from "./home/home.component";

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        TextModule,
        CommonModule
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule { }