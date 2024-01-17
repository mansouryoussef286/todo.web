import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@App/Common/Services/Authentication.Service';
import { LoginModels } from '../Login.Models';
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
		// Accessing query parameters
		this.ActivatedRoute.queryParams.subscribe((queryParams: any) => {
			console.log('auth page queryParams', queryParams);
			let response: LoginModels.AutheticationResponse = queryParams;
			this.ValidateCode(response.code);

		});
	}

	ValidateCode(code: string) {
		this.AuthenticationService.GetAccessToken(code).subscribe((data) => {
			console.log('validating code response', data);
			// extract the access token and save it for fetching data

			// route to home
			this.Router.navigateByUrl(RoutePaths.Home)
		});;
	}
}
