import { LoginModels } from '@App/Common/Models/Login.Models';
import { AuthenticationService } from '@App/Common/Services/Authentication.Service';
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
	CurrentUser!: LoginModels.CurrentUser | null;
	@ViewChild('NavbarCollapse') NavbarCollapse!: ElementRef;
	RoutePaths = RoutePaths

	AvailableLanguages: Language[] = [{ Name: 'English', Key: 'en' }, { Name: 'German', Key: 'de' }]

	constructor(
		private Router: Router,
		protected AuthService: AuthenticationService,
	) { }

	ngOnInit(): void {
		this.CurrentUser = this.AuthService.CurrentUser;
		this.AuthService.CurrentUserSub.subscribe((isExisting: boolean) => {
			if (isExisting) {
				this.CurrentUser = this.AuthService.CurrentUser;
			} else {
				this.CurrentUser = null;
			}
		})
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
