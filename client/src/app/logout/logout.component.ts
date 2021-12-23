import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router: Router) { }

  public ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(["login"])
  }
}
