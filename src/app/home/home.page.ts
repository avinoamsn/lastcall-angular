import { Component } from '@angular/core';
import { MealService } from '../services/meal/meal.service';
import {ProfileService } from '../services/user/profile.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	public profileService: ProfileService;
	public userType: string;

	constructor() {
		// this.rerouteToUserDashboard();
	}

	// reroute user to the correct dashboard, based on userType
	rerouteToUserDashboard() {
		this.profileService.getUserType().then( userType => {
			try {
				console.log(userType);
			} catch (error) {
				console.log(error);
			}
		});
	}

}
