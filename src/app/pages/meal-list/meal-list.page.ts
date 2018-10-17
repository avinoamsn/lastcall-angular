import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';

@Component({
	selector: 'app-meal-list',
	templateUrl: './meal-list.page.html',
	styleUrls: ['./meal-list.page.scss'],
})
export class MealListPage implements OnInit {
	public mealList: Array<any>;

	constructor(private mealService: MealService) {}

	ngOnInit() {
		this.mealService.getMeals().get().then( mealListSnap => {
			this.mealList = [];

			mealListSnap.forEach(snap => {
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
		});
	}

}
