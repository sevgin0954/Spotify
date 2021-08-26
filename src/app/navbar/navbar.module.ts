import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarTopComponent } from "./navbar-top/navbar-top.component";
import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        NavbarTopComponent,
        NavbarSideComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        NavbarTopComponent,
        NavbarSideComponent
    ]
})
export class NavbarModule { }