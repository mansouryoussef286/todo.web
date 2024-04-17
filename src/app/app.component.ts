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
	title = 'To-do';
	isDarkMode!: boolean;

	IsLoaded: boolean = false;
	NoLoader: boolean = false;

	constructor(
		protected Router: Router,
		protected DarkModeService: DarkModeService
	) {
		this.DarkModeService.isDarkMode$.subscribe((isDarkMode: boolean) => {
			this.isDarkMode = isDarkMode;
		})
	}

	ngOnInit() {
		this.PreLoaderListener();
	}

	PreLoaderListener() {
		if (this.Router.url.includes('auth')) {
			this.NoLoader = true;
			return;
		}

		const startTime = new Date().getTime();
		// console.log('startTime: ', startTime);

		// for mobile and very slow connections
		setTimeout(() => {
			this.IsLoaded = true;
			setTimeout(() => {
				this.NoLoader = true;
			}, 500);
		}, 5000);
		// Add an event listener to execute code when the window is loaded
		window.addEventListener('load', () => {
			// for loading after login
			if (this.Router.url.includes('auth')) {
				this.NoLoader = true;
				return;
			}

			const currentTime = new Date().getTime();
			const elapsedTime = currentTime - startTime;
			// console.log('elapsedTime: ', elapsedTime);

			const minLoadingTime = 1500;
			if (elapsedTime >= minLoadingTime) {
				// console.log('first');
				this.IsLoaded = true;
				setTimeout(() => {
					this.NoLoader = true;
				}, 500);
			} else {
				setTimeout(() => {
					// console.log('scond');
					this.IsLoaded = true;
					setTimeout(() => {
						this.NoLoader = true;
					}, 500);
				}, minLoadingTime - elapsedTime);
			}
		});
	}

	GoToLogin() {
		this.Router.navigateByUrl(RoutePaths.Login)
	}
}
