import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
	{ path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
	{ path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
	{ path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
	{ path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
	// TODO: add profile type to load correct profile module based on user (e.g. profile/:type)
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
