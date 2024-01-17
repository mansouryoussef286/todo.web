import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './Features/Header/Header';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		CommonModule,
		RouterModule.forRoot(routes),
		HttpClientModule,
		HeaderComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }