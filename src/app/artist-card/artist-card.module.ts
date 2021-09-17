import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { BoxShadowModule } from '../box-shadow/box-shadow.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ArtistCardComponent
  ],
  imports: [
    CommonModule,
    BoxShadowModule,
    RouterModule
  ],
  exports: [
    ArtistCardComponent
  ]
})
export class ArtistCardModule { }
