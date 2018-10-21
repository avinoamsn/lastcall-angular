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
	public userId: string;

	constructor(
		private mealService: MealService,
		private profileService: ProfileService
	) {}

	// get userType & pass it to getMealsByUserType()
	async ngOnInit() {
		this.mealList = [];
		this.userType = await	this.profileService.getUserType();
		this.routeByUserType( this.userType );
	}

	// determine user type, route to correct method
	async routeByUserType(userType: string): Promise<any> {
		if (userType === 'supplier') {
			this.userId = await this.profileService.getUserId();
			this.getMealsBySupplier( this.userId );
		} else {
			this.getMeals();
		}
	}

	// run the correct function based on the selected filter (activated in the DOM)
	filterChange( filter: any ) {
		if (filter.detail.value === 'default') {
			this.getMeals();
		} else if (filter.detail.value === 'price') {
			this.getMealsByPrice();
		}
	}

	// get all meals as they're ordered in the collection
	async getMeals() {
		this.mealListSnap = await this.mealService.getMeals(this.userType).get();
		this.pushQueryToMealList(this.mealListSnap);
	}

	// get all meals from a specific supplier
	async getMealsBySupplier( supplierId: string ): Promise<any> {
		this.mealListSnap = await this.mealService.getMealsBySupplier(supplierId).get();
		this.pushQueryToMealList(this.mealListSnap);
	}

	// returns a list of meal references by price, in ascending order
	// TODO: add distance & price filters
	async getMealsByPrice() {
		this.mealListSnap = await this.mealService.getMealsByPrice(this.userType).get();
		this.pushQueryToMealList(this.mealListSnap);
	}

	// add meals returned from a query to the mealList array
	pushQueryToMealList( mealListSnap: any ) {
		this.mealList = []; // clear array

		// prices get fixed decimals here b/c firebase stores the floating points as strings if the decimal is added on data entry
		mealListSnap.forEach(snap => {
			this.mealList.push({
				id: snap.id,
				mealName: snap.data().mealName,
				mealDescription: snap.data().mealDescription,
				originalPrice: snap.data().originalPrice.toFixed(2),
				discountPrice: snap.data().discountPrice.toFixed(2),
				numMeals: snap.data().numMeals,
				availabilityWindowStart: snap.data().availabilityWindowStart,
				availabilityWindowEnd: snap.data().availabilityWindowEnd,
				pickupType: snap.data().pickupType,
				coupon: snap.data().coupon,
			});
		});
	}

}
