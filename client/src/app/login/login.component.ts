import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthenticationService, private router: Router) { }

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate([""]);
    }
  }

  public login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => this.router.navigate([""]), 
      error: (error) => this.errorMessage = error.error.message
    })
  }
}
