import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@App/Common/Services/Authentication.Service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
	constructor(
		private AuthenticationService: AuthenticationService,
		private ActivatedRoute: ActivatedRoute
	) { }

	async ngOnInit() {
		this.ActivatedRoute.queryParams.subscribe((queryParams: any) => {
			this.AuthenticationService.ReturnUrl = queryParams['returnUrl'] ?? '';
		});
	}

	authenticate() {
		this.AuthenticationService.Authenticate();
	}

	logout() {
		this.AuthenticationService.Logout();
	}
}
