import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@App/Common/Services/Authentication.Service';
import { LoginModels } from '../Login.Models';

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private AuthenticationService: AuthenticationService
	) { }

	ngOnInit(): void {
		// Accessing query parameters
		this.route.queryParams.subscribe((queryParams: any) => {
			console.log(queryParams);
			let response: LoginModels.AutheticationResponse = queryParams;

			this.AuthenticationService.GetAccessToken(response);
		});
	}
}
