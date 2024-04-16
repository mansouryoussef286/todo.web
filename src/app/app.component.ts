import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePaths } from './Common/Settings/RoutePaths';
import { DarkModeService } from './Common/Services/DarkMode.Service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	title = 'Todo';
	isDarkMode!: boolean;

	constructor(
		protected Router: Router,
		protected DarkModeService: DarkModeService
	) {
		this.DarkModeService.isDarkMode$.subscribe((isDarkMode: boolean) => {
			this.isDarkMode = isDarkMode;
		})
	}

	GoToLogin() {
		this.Router.navigateByUrl(RoutePaths.Login)
	}
}
