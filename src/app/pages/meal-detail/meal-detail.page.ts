import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-meal-detail',
	templateUrl: './meal-detail.page.html',
	styleUrls: ['./meal-detail.page.scss'],
})
export class MealDetailPage implements OnInit {
	public currentMeal: any = {};

	constructor(
		private mealService: MealService,
		private route: ActivatedRoute,
	) {}

	ngOnInit() {
		const mealId: string = this.route.snapshot.paramMap.get('id'); // get the mealId passed through the app-route module

		// set consts to contain all the info from the meal doc
		this.mealService.getMeal(mealId).get().then( mealSnap => {
			// set currentMeal object to the snapshot's data & add the mealId
			this.currentMeal = mealSnap.data();
			this.currentMeal.id = mealSnap.id;

			// add a supplierRefData field/map to the currentMeal object
			mealSnap.data().supplierRef.get().then( supplierSnap => {
				console.log(supplierSnap.data());
				this.currentMeal.supplierRefData = supplierSnap.data();
			});
		});
	}

}
