import { Component } from '@angular/core';
import { AuthenticationService } from '../Common/Services/Authentication.Service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent {
	constructor(private AuthenticationService: AuthenticationService) { }

	authenticate() {
		this.AuthenticationService.Authenticate();
	}

	logout() {
		this.AuthenticationService.Logout();
	}
}
