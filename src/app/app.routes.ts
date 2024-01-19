import { Routes } from '@angular/router';
import { AuthGuard } from '@App/Common/Guards/Auth.Guard';
import { LoginComponent } from '@App/Features/login/login.component';
import { AuthComponent } from '@App/Features/login/auth/auth.component';
import { HomeComponent } from '@App/Features/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent },
    {
        canActivate: [AuthGuard],
        path: 'todolist',
        loadComponent: () => import('@App/Features/todo-list/todo-list.component').then((c) => c.TodoListComponent)
    },
];
