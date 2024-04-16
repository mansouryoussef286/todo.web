import { Injectable } from '@angular/core';
import { StorageEnum, StorageService } from './Storage.Service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DarkModeService {
	private isDarkMode: boolean = false;
	isDarkMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isDarkMode);

	constructor(
		private StorageService: StorageService
	) {
		this.HandleDarkModePreviouslySet();
	}

	private HandleDarkModePreviouslySet() {
		const savedMode = this.StorageService.GetLocalStorage<boolean>(StorageEnum.IsDarkMode);
		if (Object.keys(savedMode).length == 0 && typeof savedMode != 'boolean') {
			this.StorageService.SetLocalStorage(StorageEnum.IsDarkMode, this.isDarkMode)
		}
		else {
			this.isDarkMode = savedMode;
			this.isDarkMode$.next(this.isDarkMode);
		}
	}

	ToggleDarkMode() {
		this.isDarkMode = !this.isDarkMode;
		this.StorageService.SetLocalStorage(StorageEnum.IsDarkMode, this.isDarkMode)
		this.isDarkMode$.next(this.isDarkMode);
	}
}