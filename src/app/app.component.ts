import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePaths } from './Common/Settings/RoutePaths';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title = 'Todo';
	constructor(protected Router: Router) { }

	GoToLogin() {
		this.Router.navigateByUrl(RoutePaths.Login)
	}
}
