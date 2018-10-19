import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { ProfileService } from '../../services/user/profile.service';

@Component({
	selector: 'app-meal-list',
	templateUrl: './meal-list.page.html',
	styleUrls: ['./meal-list.page.scss'],
})
export class MealListPage implements OnInit {
	public mealList: Array<any>;
	public mealListSnap: any;
	public userType: string;

	constructor(
		private mealService: MealService,
		private profileService: ProfileService
	) {}

	// get userType & pass it to getMealsByUserType()
	async ngOnInit() {
		this.mealList = [];
		this.userType = await	this.profileService.getUserType();
		this.getMealsByUserType( this.userType );
	}

	// determine user type, route to correct method
	getMealsByUserType(userType: string): any {
		if (userType === 'supplier') {
			this.getMealsBySupplier();
		} else {
			this.getMeals();
		}
	}

	// returns all meals as they're ordered in the collection
	async getMeals() {
		this.mealListSnap = await this.mealService.getMeals().get();

		this.mealListSnap.forEach(snap => {
			this.mealList.push({
				id: snap.id,
				mealName: snap.data().mealName,
				mealDescription: snap.data().mealDescription,
				originalPrice: snap.data().originalPrice,
				discountPrice: snap.data().discountPrice,
				numMeals: snap.data().numMeals,
				availabilityWindowStart: snap.data().availabilityWindowStart,
				availabilityWindowEnd: snap.data().availabilityWindowEnd,
				pickupType: snap.data().pickupType,
				coupon: snap.data().coupon,
			});
		});
	}

	getMealsBySupplier( supplierId: string ) {

	}
}
