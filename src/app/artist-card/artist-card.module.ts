import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { RouterModule } from '@angular/router';
import { DynamicColorModule } from '../dynamic-color/dynamicColor.module';

@NgModule({
  declarations: [
    ArtistCardComponent
  ],
  imports: [
    CommonModule,
    DynamicColorModule,
    RouterModule
  ],
  exports: [
    ArtistCardComponent
  ]
})
export class ArtistCardModule { }
