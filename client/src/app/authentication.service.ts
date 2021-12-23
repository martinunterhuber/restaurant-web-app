import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private client: HttpClient) {}

  public login(username: string, password: string) {
    let ret = this.client.post<{token: string}>("http://localhost:3000/login/", {id: 3, pass: password});
    ret.subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("roles", JSON.stringify(["Backoffice"]));
      }
    })
    return ret;
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
  }

  public isLoggedIn() {
    return localStorage.getItem("token") != null;
  }

  public hasRole(role: string) {
    let roles = localStorage.getItem("roles");
    if (roles) {
      return (JSON.parse(roles) as string[]).find(r => r === role) !== undefined;
    }
    return false;
  }

  public getToken() {
    return localStorage.getItem("token");
  }
}
