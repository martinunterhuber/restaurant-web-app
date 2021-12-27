import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private client: HttpClient) {}

  public login(username: string, password: string) {
    let ret = this.client.post<{token: string, roles: string[]}>("http://localhost:3000/login/", {name: username, pass: password});
    ret.subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);
      }
    })
    return ret;
  }

  public logout() {
    localStorage.removeItem("token");
  }

  public isLoggedIn() {
    return localStorage.getItem("token") != null;
  }

  private parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }

  public hasRole(role: string) {
    if (this.isLoggedIn()) {
      let roles = this.parseJwt(localStorage.getItem("token")!)["roles"] as string[];
      if (roles) {
        return roles.find(r => r === role) !== undefined;
      }
    }

    return false;
  }

  public getToken() {
    return localStorage.getItem("token");
  }
}
