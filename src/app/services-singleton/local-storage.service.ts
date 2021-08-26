import { Injectable } from '@angular/core';
import { MainConstants } from '../shared/constants/main-constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setApiToken(token: string): void {
    localStorage.setItem(MainConstants.API_TOKEN_KEY, token);
  }

  setUserToken(token: string): void {
    localStorage.setItem(MainConstants.USER_TOKEN_KEY, token);
  }

  getApiToken(): string | null {
    return localStorage.getItem(MainConstants.API_TOKEN_KEY);
  }

  getUserToken(): string | null {
    return localStorage.getItem(MainConstants.USER_TOKEN_KEY);
  }

  removeApiToken(): void {
    localStorage.removeItem(MainConstants.API_TOKEN_KEY);
  }

  removeUserToken(): void {
    localStorage.removeItem(MainConstants.USER_TOKEN_KEY);
  }
}
