import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

export class Language {
	Name!: string;
	Key!: string;
}
@Component({
	selector: 'app-header',
	templateUrl: './Header.html',
	styleUrls: ['./Header.scss'],
	standalone: true,
	imports: [RouterModule]
})
export class HeaderComponent {
	CurrentUser: any
	@ViewChild('NavbarCollapse') NavbarCollapse!: ElementRef;
	RoutePaths = RoutePaths

	AvailableLanguages: Language[] = [{ Name: 'English', Key: 'en' }, { Name: 'German', Key: 'de' }]

	constructor(
		private Router: Router,
		// protected AuthService: AuthService,
	) {
		// this.CurrentUser = this.AuthService.CurrentUser
	}

	goToProfile() {
	}

	goToSettings() {
	}

	signOut() {
		// this.AuthService.SignOut();
		// if (this.AuthService.isGoogleLoggedin)
		// 	this.socialAuthService.signOut();
		// this.Router.navigate([RoutePaths.Login])
	}
}
