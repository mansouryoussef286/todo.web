import { Injectable } from '@angular/core';
import { HttpService } from './Http.Service';
import { HttpEndPoints } from '../Settings/HttpEndPoints';
import { LoginModels } from '@App/Common/Models/Login.Models';
import { Observable, tap } from 'rxjs';
import { StorageEnum, StorageService } from './Storage.Service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
	private TenantBaseUrl = 'https://dev-i4yy6aosmfbqnxq3.us.auth0.com/';
	private State!: string;

	constructor(
		private HttpService: HttpService,
		private StorageService: StorageService
	) { }

	get AccessToken(): string {
		let token = this.StorageService.GetLocalStorage<string>(StorageEnum.AccessToken);
		if (Object.keys(token).length == 0) return '';
		return token;
	}

	set AccessToken(value) {
		this.StorageService.SetLocalStorage(StorageEnum.AccessToken, value);
	}

	get RefreshToken(): string {
		let token = this.StorageService.GetLocalStorage<string>(StorageEnum.RefreshToken);
		if (Object.keys(token).length == 0) return '';
		return token;
	}

	set RefreshToken(value) {
		this.StorageService.SetLocalStorage(StorageEnum.RefreshToken, value);
	}

	get CurrentUser(): LoginModels.CurrentUser {
		return this.StorageService.GetLocalStorage<LoginModels.CurrentUser>(StorageEnum.CurrentUser);
	}

	get IsAuthenticated(): boolean {
		return Object.keys(this.CurrentUser).length != 0 ? true : false;
	}

	get ReturnUrl(): string {
		let url = this.StorageService.GetLocalStorage<string>(StorageEnum.ReturnUrl);
		if (Object.keys(url).length == 0) return '';
		return url;
	}

	set ReturnUrl(value) {
		this.StorageService.SetLocalStorage(StorageEnum.ReturnUrl, value);
	}


	Authenticate() {
		let url = this.GetAuthenticationUrl();
		window.open(url, "_self");
	}

	private GetAuthenticationUrl(): string {
		// use dotenv to store values from 
		// https://medium.com/@desinaoluseun/using-env-to-store-environment-variables-in-angular-20c15c7c0e6a
		let response_type = 'code';
		let client_id = '7AtMgepqMwqvlgtKhV2vQy7YmWYCr3oI';
		let scope = 'openid profile email';
		let redirect_uri = 'http://localhost:4200/auth';
		let state = 'STATE';

		this.State = state;
		return `${this.TenantBaseUrl}authorize?response_type=${response_type}&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;
	}

	HandleAuthentication(response: LoginModels.AutheticationResponse): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			if (this.CheckState(response.state))
				this.ValidateCode(response.code).subscribe({
					next: (data: LoginModels.ValidateCodeResponse) => {
						if (data.Success) {
							// console.log('validating code response', data);
							this.HandleSuccessAuthenticationResponse(data);
							resolve(true);
						} else {
							console.log('success = false');
							reject();
						}
					},
					error: err => {
						console.log('validation code error');
						console.log(err);
						reject();
					}
				})
			else {
				console.log('incorrect state');
				reject();
			}

		})
	}

	private CheckState(state: string): boolean {
		return state != this.State;
	}

	private ValidateCode(code: string): Observable<LoginModels.ValidateCodeResponse> {
		return this.HttpService.Get<any>(HttpEndPoints.Account.Authenticate + '/' + code)
	}

	private HandleSuccessAuthenticationResponse(response: LoginModels.ValidateCodeResponse) {
		this.StorageService.SetLocalStorage(StorageEnum.AccessToken, response.AccessToken);
		this.StorageService.SetLocalStorage(StorageEnum.RefreshToken, response.RefreshToken);
		this.StorageService.SetLocalStorage(StorageEnum.CurrentUser, response.CurrentUser);

	}

	Logout() {
		this.StorageService.RemoveLocalStorage(StorageEnum.AccessToken);
		this.StorageService.RemoveLocalStorage(StorageEnum.RefreshToken);
		this.StorageService.RemoveLocalStorage(StorageEnum.CurrentUser);
	}

	RefreshAccessToken(): any {
		let requestModel = {
			UserId: this.CurrentUser.Id,
			AccessToken: this.AccessToken,
			RefreshToken: this.RefreshToken
		} as LoginModels.RefreshTokenReqModel;

		let httpEndPoint = HttpEndPoints.Account.Refresh;
		return this.HttpService.Post<LoginModels.RefreshTokenReqModel, LoginModels.RefreshTokenResModel>(
			httpEndPoint,
			requestModel,
		).pipe(
			tap((data) => {
				console.log('access token refreshed');

				this.AccessToken = data.AccessToken;
				this.RefreshToken = data.RefreshToken;
			})
		);
	}
}