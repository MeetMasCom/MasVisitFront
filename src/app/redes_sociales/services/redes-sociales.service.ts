import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedesSocialesService {
  private accessToken: string | null = null;

  constructor() { }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }
}
