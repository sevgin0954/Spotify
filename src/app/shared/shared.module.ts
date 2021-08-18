import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingElementsComponent } from './components/loading-elements/loading-elements.component';
import { LoadingComponent } from "./components/loading/loading.component";

@NgModule({
  declarations: [
    LoadingElementsComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingElementsComponent,
    LoadingComponent
  ]
})
export class SharedModule { }