import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '@App/Common/Services/Authentication.Service';
import { RoutePaths } from '../Settings/RoutePaths';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	IsCurrentlyRefreshing: boolean = false;
	constructor(
		private router: Router,
		private AuthenticationService: AuthenticationService,
	) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let accessToken = this.AuthenticationService.AccessToken;
		let httpRequest = req;
		httpRequest = this.AddAccessToken(req, accessToken);

		return next.handle(httpRequest).pipe(
			catchError((error, caught) => {
				if (error.status == 401) {
					return this.AuthenticationService.RefreshAccessToken().pipe(
						switchMap((data: any) => {
							const modifiedRequest = this.AddAccessToken(httpRequest, data.AccessToken);
							return next.handle(modifiedRequest);
						}),
						catchError((err) => {
							this.router.navigateByUrl(RoutePaths.Home);
							return EMPTY;
						})
					);
				}
				return throwError(() => error);
			})
		) as any;
	}

	AddAccessToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
		if (typeof token === 'string') {
			return req.clone({ headers: req.headers.set('authorization', token) });
		}
		return req;
	}
}
