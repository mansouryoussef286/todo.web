import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
	ApiUrl: string = 'http://localhost:54321/';
	
	constructor(private HttpClient: HttpClient) { }

	Get<T>(endPoint: string) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.get<T>(endPointUrl).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Post<Req, Res>(endPoint: string, model: Req,) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.post<Res>(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Put<Req, Res>(endPoint: string, model: Req) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.put<Res>(endPointUrl, model).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	Delete(endPoint: string) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.delete(endPointUrl).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	GetWithOptions<T>(endPoint: string, options: any) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.get<T>(endPointUrl, options).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	GetWithParams<T>(endPoint: string, params: any) {
		const endPointUrl = this.ApiUrl + endPoint;
		let options = {
			params: params
		};
		return this.HttpClient.get<T>(endPointUrl, options).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}

	PostWithOptions<Req, Res>(endPoint: string, model: Req, options: any) {
		const endPointUrl = this.ApiUrl + endPoint;
		return this.HttpClient.post<Res>(endPointUrl, model, options).pipe(
			catchError((error) => {
				// console.error(error);
				return throwError(() => error);
			})
		);
	}
}
