import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { ProfileService } from '../user/profile.service';
import { Timestamp } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class MealService {
	// reference to the doc id of a meal in a supplier's collection
	private supplierMealsListColDocRef: firebase.firestore.DocumentReference;
	// doc reference to the current user in the `/${userType}s/` collection
	private userTypeColUserDocRef: Promise<firebase.firestore.DocumentReference>;
	private userType: any;

	constructor(
		public profileService: ProfileService,
	) {
		this.userType = profileService.getUserType();
		this.userTypeColUserDocRef = profileService.getUserTypeColUserDocRef();

		// tslint:disable-next-line:max-line-length
		// if the userType is 'supplier', set supplierMealsListColDocRef to the meals collection in the user doc. Otherwise, set to /meals/ collection
		/*if (this.userType === 'suppliers') {
			this.supplierMealsListColDocRef = firebase.firestore().collection(`${this.userTypeColUserDocRef}/meals/`);
		}*/
	}

	// (for suppliers) add meal
	async addMeal( mealCreateForm: FormGroup ): Promise<void> {
			const batch = firebase.firestore().batch();
			const newMealDocRef = firebase.firestore().collection('meals').doc(); // document reference to the new meal

			this.profileService.getUserTypeColUserDocRef().then( ref => {
				// since only suppliers run this function, supplierMealsListColDocRef is set to the supplier's meals sub-collection
				this.supplierMealsListColDocRef = firebase.firestore().collection(`/suppliers/${ref.id}/meals/`).doc();

				// add meal doc to meals collection
				batch.set(newMealDocRef, {
					supplierId: ref.id,
					mealName: mealCreateForm.value.mealName,
					mealDescription: mealCreateForm.value.mealDescription,
					originalPrice: mealCreateForm.value.originalPrice,
					discountPrice: mealCreateForm.value.discountPrice,
					numMeals: mealCreateForm.value.numMeals,
					availabilityWindowStart: mealCreateForm.value.availabilityWindowStart,
					availabilityWindowEnd: mealCreateForm.value.availabilityWindowEnd,
					pickupType: mealCreateForm.value.pickupType,
					coupon: mealCreateForm.value.coupon,
				});

				// this command could be run outside of the promise, but keeping it here for clarity
				// add meal reference to meals list under supplier
				batch.set(this.supplierMealsListColDocRef,
					{ mealRef: newMealDocRef });

				// TODO: check to make sure commit executed successfully
				// 10.15.18: will catch any errors but this likely isn't sufficient
				try {
					batch.commit();
				} catch (error) {
					console.error(error);
					throw new Error(error);
				}
			});
	}

	// remove meal
	removeMeal() {

	}

	// return a doc reference to a specific meal
	getMeal( mealId: string ): firebase.firestore.DocumentReference {
		return firebase.firestore().collection('meals').doc(mealId);
	}

	// return a doc reference to a specific meal within a supplier's collection
	getSupplierMeal(): firebase.firestore.DocumentReference {
		return this.supplierMealsListColDocRef;
	}

	// returns a list of meal references by proximity to user
	getMealsByDistance( mealId: string, distance: number ): firebase.firestore.CollectionReference {
		return null; // TODO
	}

	// returns a list of meal references by price, low to high
	getMealsByPrice( mealId: string, distance: number ): firebase.firestore.CollectionReference {
		return null; // TODO
	}

	// returns a list of meal references by expiration date, soonest first
	getMealsByExpirationDate( mealId: string, distance: number ): firebase.firestore.CollectionReference {
		return null; // TODO
	}

		// returns a list of meal references by expiration date, soonest first
	getMealsByTag(
		mealId: string,
		distance: number,
		tags: Array<string>,
		): firebase.firestore.CollectionReference {
			return null; // TODO
	}
}
