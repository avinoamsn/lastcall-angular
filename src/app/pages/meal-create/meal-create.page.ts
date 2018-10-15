import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { MealService } from '../../services/meal/meal.service';

@Component({
	selector: 'app-meal-create',
	templateUrl: './meal-create.page.html',
	styleUrls: ['./meal-create.page.scss'],
})
export class MealCreatePage implements OnInit {
	public mealCreateForm: FormGroup;
	private loading: HTMLIonLoadingElement;
	public myDate: String = new Date().toISOString(); // ionic uses ISO 8601 datetime format for its value
	// TODO: localize time for availability window

	constructor(
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private formBuilder: FormBuilder,
		private router: Router,
		private mealService: MealService,
	) {
		// initialize create meal form w/ validators
		// TODO: additional validators & error checking
		this.mealCreateForm = this.formBuilder.group({
			mealName: ['', Validators.compose([Validators.required])],
			mealDescription: ['', Validators.compose([Validators.required])],
			originalPrice: ['', Validators.compose([Validators.required])],
			discountPrice: ['', Validators.compose([Validators.required])],
			numMeals: ['', Validators.compose([Validators.required])],
			availabilityWindowStart: ['', Validators.compose([Validators.required])],
			availabilityWindowEnd: ['', Validators.compose([Validators.required])],
			pickupType: ['', Validators.compose([Validators.required])],
			coupon: [''],
		});
	}

	ngOnInit() {
		console.log(this.myDateOffset);
		console.log(this.myDate);
	}

	addMeal(
		supplierId: firebase.firestore.DocumentReference,
		mealName: string,
		mealDescription: string,
		originalPrice: number,
		discountPrice: number,
		numMeals: number,
		availabilityWindowStart: Date,
		availabilityWindowEnd: Date,
		pickupType: Array<boolean>,
		coupon: boolean,
	): void {

	}

}
