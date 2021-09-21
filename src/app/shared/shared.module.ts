import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingElementsComponent } from './components/loading-elements/loading-elements.component';
import { LoadingComponent } from "./components/loading/loading.component";
import { LikeComponent } from './components/like/like.component';
import { SectionRowComponent } from './components/section-row/section-row.component';
import { PopularityIndicatorComponent } from './components/popularity-indicator/popularity-indicator.component';

@NgModule({
  declarations: [
    LoadingElementsComponent,
    LoadingComponent,
    LikeComponent,
    SectionRowComponent,
    PopularityIndicatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingElementsComponent,
    LoadingComponent,
    LikeComponent,
    SectionRowComponent,
    PopularityIndicatorComponent
  ]
})
export class SharedModule { }