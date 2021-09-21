import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    SigninComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SigninComponent,
    LogoutComponent
  ]
})
export class AuthenticationModule { }
