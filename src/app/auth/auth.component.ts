import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../Common/Services/Http.Service';
import { HttpEndPoints } from '../Common/Settings/HttpEndPoints';

class AutheticationResponse {
	code!: string;
	state!: string;
}

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
		private HttpService: HttpService
	) { }

	ngOnInit(): void {
		// Accessing query parameters
		this.route.queryParams.subscribe((queryParams: any) => {
			console.log(queryParams);
			let response: AutheticationResponse = queryParams;
			// check on state
			this.HttpService.Get<any>(HttpEndPoints.Account.Authenticate + '/' + response.code).subscribe((data) => {
				console.log(data);
				// extract the access token and save it for fetching data
			});
		});
	}
}
