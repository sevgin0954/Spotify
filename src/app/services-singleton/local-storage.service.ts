import { Injectable } from '@angular/core';

const AUTH_TOKEN_KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}
