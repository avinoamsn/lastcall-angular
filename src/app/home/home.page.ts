import { Component, OnInit } from '@angular/core';
import { MealService } from '../services/meal/meal.service';
import { ProfileService } from '../services/user/profile.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	private userType: string;

	constructor(
		private profileService: ProfileService,
		private router: Router,
	) {}

	// get userType & pass it to rerouteToUserDashboard()
	async ngOnInit() {
		this.userType = await	this.profileService.getUserType();
		this.rerouteToUserDashboard( this.userType );
	}

	// reroute user to the correct dashboard, based on userType
	// TODO: guard against users getting to the alternate dash by manually entering URL
	async rerouteToUserDashboard( userType: string ) {
		console.log(userType);

		if (userType === 'supplier') {
			this.router.navigateByUrl('dashboard-supplier');
		} else {
			this.router.navigateByUrl('dashboard-subscriber');
		}
	}
}
