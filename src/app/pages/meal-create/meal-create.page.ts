import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, AngularDelegate } from '@ionic/angular';
import { MealService } from '../../services/meal/meal.service';
// import { DateTime } from 'luxon';

@Component({
	selector: 'app-meal-create',
	templateUrl: './meal-create.page.html',
	styleUrls: ['./meal-create.page.scss'],
})
export class MealCreatePage implements OnInit {
	public mealCreateForm: FormGroup;
	private loading: HTMLIonLoadingElement;
	public myDate: String = new Date().toISOString(); // toISOString() is used b/c ionic uses ISO 8601 datetime format for its value
	// TODO: localize time for availability window (Date object returns UTC)
	public pickupTypes: Array<any>;

	constructor(
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private formBuilder: FormBuilder,
		private router: Router,
		private mealService: MealService,
		// private dateTime: DateTime,
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

		// TODO: wondering how this can be turned into an array of booleans for Firestore, but retain the ngFor loop functionality in the DOM
		this.pickupTypes = [
			{ text: 'Dine in', value: 'dine-in' },
			{ text: 'Pickup', value: 'pickup' },
			{ text: 'Delivery', value: 'delivery' }
		];

		// sets the default date (currently UTC time) for the availability window date/time selections
		// ngModel i/o property has been deprecated, will be removed in Angular v7
		// https://angular.io/api/forms/FormControlName#use-with-ngmodel
		// TODO: consider moment.js as an alternative to this?
		// removing default dates for now b/c, for some reason, ionic returns an object when the date is modified
		// (vs. an ISO string, which it uses to display the default date),
		// and converting the object into an ISO string for datatype consistency is proving difficult
		this.mealCreateForm.get('availabilityWindowStart')
			.setValue(this.myDate);
		this.mealCreateForm.get('availabilityWindowEnd')
			.setValue(this.myDate);
	}

	ngOnInit() {}

	// passes mealCreateForm to mealService for parsing & committing
	addMeal( mealCreateForm: FormGroup ): Promise<any> {
		return this.mealService.addMeal(mealCreateForm);
	}

}
