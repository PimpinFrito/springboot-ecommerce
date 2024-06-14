import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthIntercepterService implements HttpInterceptor {
  private authToken: string = '';

  constructor(private auth: AuthService) {
    this.auth
      .getAccessTokenSilently()
      .subscribe((token) => (this.authToken = token));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;

    const securedEndPoints = [environment.restApiUrl + '/orders'];

    // If the user is authenticated, add the token to the headers
    if (
      this.auth.isAuthenticated$ &&
      securedEndPoints.some((url) => req.urlWithParams.includes(url))
    ) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authToken}`,
        },
      });
    }

    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
