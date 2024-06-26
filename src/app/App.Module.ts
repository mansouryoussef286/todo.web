import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '@App/Features/Header/Header';
import { AuthInterceptor } from '@App/Common/Interceptors/Auth.Interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PreLoaderComponent } from './Common/Widgets/PreLoader/PreLoader';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		CommonModule,
		RouterModule.forRoot(routes),
		HttpClientModule,
		HeaderComponent,
		FontAwesomeModule,
		PreLoaderComponent
	],
	bootstrap: [AppComponent],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	]
})
export class AppModule { }