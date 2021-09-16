import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { BoxShadowModule } from '../box-shadow/box-shadow.module';

@NgModule({
  declarations: [
    ArtistCardComponent
  ],
  imports: [
    CommonModule,
    BoxShadowModule
  ],
  exports: [
    ArtistCardComponent
  ]
})
export class ArtistCardModule { }
