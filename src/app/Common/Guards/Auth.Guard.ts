import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication.Service';
import { RoutePaths } from '../Settings/RoutePaths';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
	constructor(
		private router: Router,
		private AuthenticationService: AuthenticationService,
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.AuthenticationService.IsAuthenticated) {
			return true;
		}

		this.router.navigate([RoutePaths.Login], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
