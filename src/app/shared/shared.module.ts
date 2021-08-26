import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingElementsComponent } from './components/loading-elements/loading-elements.component';
import { LoadingComponent } from "./components/loading/loading.component";
import { LikeComponent } from './components/like/like.component';

@NgModule({
  declarations: [
    LoadingElementsComponent,
    LoadingComponent,
    LikeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingElementsComponent,
    LoadingComponent,
    LikeComponent
  ]
})
export class SharedModule { }