import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@App/Common/Services/Authentication.Service';
import { LoginModels } from '../../../Common/Models/Login.Models';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
	constructor(
		private ActivatedRoute: ActivatedRoute,
		private Router: Router,
		private AuthenticationService: AuthenticationService
	) { }

	ngOnInit(): void {
		this.ActivatedRoute.queryParams.subscribe((queryParams: any) => {
			console.log('auth page queryParams', queryParams);

			let response: LoginModels.AutheticationResponse = queryParams;
			this.AuthenticationService.HandleAuthentication(response).then(isAuthenticated => {
				isAuthenticated ? this.OnLoginSuccess() : this.OnLoginFailure();
			});

		});
	}

	OnLoginSuccess() {
		this.NavigateTo();
	}

	OnLoginFailure() {
		this.Router.navigateByUrl(RoutePaths.Login);
		alert('failed login');
	}

	NavigateTo() {
		let returnUrl = this.AuthenticationService.ReturnUrl
		const route = !!returnUrl ? returnUrl : RoutePaths.Default;
		this.Router.navigateByUrl(route);
	}
}
