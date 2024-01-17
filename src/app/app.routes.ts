import { Routes } from '@angular/router';
import { LoginComponent } from '@App/Features/login/login.component';
import { AuthComponent } from '@App/Features/login/auth/auth.component';
import { HomeComponent } from './Features/home/home.component';
import { TodoListComponent } from './Features/todo-list/todo-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent },
    { path: 'todolist', component: TodoListComponent },
];
