import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@App/Common/Services/Authentication.Service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule, CommonModule,],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
	IsAuthenticated!: boolean;

	constructor(
		private AuthenticationService: AuthenticationService,
		private ActivatedRoute: ActivatedRoute
	) { }

	async ngOnInit() {
		this.ActivatedRoute.queryParams.subscribe((queryParams: any) => {
			this.AuthenticationService.ReturnUrl = queryParams['returnUrl'] ?? '';
		});

		this.IsAuthenticated = this.AuthenticationService.IsAuthenticated
	}

	authenticate() {
		this.AuthenticationService.Authenticate();
	}

	logout() {
		this.AuthenticationService.Logout();
		this.IsAuthenticated = false;
	}
}
