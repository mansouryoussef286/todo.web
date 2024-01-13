import { Routes } from '@angular/router';
import { LoginComponent } from '@App/Features/login/login.component';
import { AuthComponent } from '@App/Features/login/auth/auth.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'auth', component: AuthComponent },
];
