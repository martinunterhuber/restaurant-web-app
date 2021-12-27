import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class JWTHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      request = request.clone({ headers: request.headers.set('Authorization', this.authService.getToken()!) });
    }
    return next.handle(request).pipe(
      catchError(
        (event: HttpErrorResponse) => {
          if (event.status === 401) {
            // someone might have changed the JWT so log them out
            this.authService.logout();
            this.router.navigate(["login"]);
          } else if (event.status === 403) {
            this.router.navigate([""]);
          }
          return throwError(() => event);
        }
      )
    );
  }
}