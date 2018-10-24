import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', loadChildren: './home/home.module#HomePageModule' },
	{ path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
	{ path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
	{ path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
	{ path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
	{ path: 'meal-create', loadChildren: './pages/meal-create/meal-create.module#MealCreatePageModule', canActivate: [AuthGuard] },
	{ path: 'meal-list', loadChildren: './pages/meal-list/meal-list.module#MealListPageModule', canActivate: [AuthGuard] },
	{ path: 'meal-detail/:id', loadChildren: './pages/meal-detail/meal-detail.module#MealDetailPageModule', canActivate: [AuthGuard] },
	{ path: 'dashboard-supplier',
	loadChildren: './pages/dashboard-supplier/dashboard-supplier.module#DashboardSupplierPageModule', canActivate: [AuthGuard] },
	{ path: 'dashboard-subscriber',
	loadChildren: './pages/dashboard-subscriber/dashboard-subscriber.module#DashboardSubscriberPageModule', canActivate: [AuthGuard] },
	{ path: 'profile-subscriber',
	loadChildren: './pages/profile-subscriber/profile-subscriber.module#ProfileSubscriberPageModule', canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
