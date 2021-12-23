import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private authService: AuthenticationService, private cdr: ChangeDetectorRef) { }

  ngAfterViewChecked(): void {
		this.cdr.detectChanges();
	}

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public hasRole(role: string) {
    return this.authService.hasRole(role);
  }
}
