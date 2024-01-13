import { Injectable } from '@angular/core';
import { HttpService } from './Http.Service';
import { HttpEndPoints } from '../Settings/HttpEndPoints';
import { LoginModels } from '@App/Features/login/Login.Models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	TenantBaseUrl = 'https://dev-i4yy6aosmfbqnxq3.us.auth0.com/';

	constructor(private HttpService: HttpService) { }

	Authenticate() {
		let url = this.GetAuthenticationUrl();
		window.open(url, "_self");
	}

	GetAuthenticationUrl() {
		let response_type = 'code';
		let client_id = '7AtMgepqMwqvlgtKhV2vQy7YmWYCr3oI';
		let scope = 'openid profile email';
		let redirect_uri = 'http://localhost:4200/auth';
		let state = 'STATE';

		return `${this.TenantBaseUrl}authorize?response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;
	}

	GetAccessToken(response: LoginModels.AutheticationResponse) {
		// check state then get access token
		this.HttpService.Get<any>(HttpEndPoints.Account.Authenticate + '/' + response.code).subscribe((data) => {
			console.log(data);
			// extract the access token and save it for fetching data
		});
	}

	Logout() {

	}
}