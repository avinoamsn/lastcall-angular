import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { ProfileService } from '../user/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { convertDataToISO } from 'ionic-angular/util/datetime-util'; // planned on using this to remedy the date formatting problem

@Injectable({
	providedIn: 'root'
})
export class MealService {
	// reference to the doc id of a meal in a supplier's collection
	public supplierMealsListColDocRef: firebase.firestore.DocumentReference;
	// reference to the /meals/ collection
	public mealsColRef: firebase.firestore.CollectionReference;
	// doc reference to the current user in the `/${userType}s/` collection
	public userTypeColUserDocRef: Promise<firebase.firestore.DocumentReference>;
	public userType: any;

	constructor(
		public profileService: ProfileService,
	) {
		this.mealsColRef = firebase.firestore().collection(`/meals/`);
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

				// if availability window start & end times have been modified, turn them into ISO strings
				// (retain format of the default date displayed in the DOM)
				// maybe this will be helpful:
				// https://github.com/ionic-team/ionic/blob/24544e01e150bf59bfc8a6d1cc38b7cdae860c4f/src/util/datetime-util.ts#L339
				/*console.log(mealCreateForm.value.availabilityWindowStart.hour);
				console.log(convertDataToISO(mealCreateForm.value.availabilityWindowStart.hour));
				if (typeof mealCreateForm.value.availabilityWindowStart !== 'string') {
					mealCreateForm.value.availabilityWindowStart = convertDataToISO(mealCreateForm.value.availabilityWindowStart);
				}
				if (typeof mealCreateForm.value.availabilityWindowEnd !== 'string') {
					mealCreateForm.value.availabilityWindowEnd = convertDataToISO(mealCreateForm.value.availabilityWindowEnd);
				}*/

				// TODO: dates are turned into ISO strings to conform to the format used by the default start & end times (in the DOM)

				// add meal doc to meals collection
				batch.set(newMealDocRef, {
					supplierRef: ref,
					mealName: mealCreateForm.value.mealName,
					mealDescription: mealCreateForm.value.mealDescription,
					originalPrice: mealCreateForm.value.originalPrice.toFixed(2),
					discountPrice: mealCreateForm.value.discountPrice.toFixed(2),
					numMeals: mealCreateForm.value.numMeals,
					availabilityWindowStart: mealCreateForm.value.availabilityWindowStart,
					availabilityWindowEnd: mealCreateForm.value.availabilityWindowEnd,
					pickupType: mealCreateForm.value.pickupType,
					coupon: mealCreateForm.value.coupon,
				});

				// add meal reference to meals list under supplier
				// this command could be run outside of the promise, but keeping it here for clarity
				batch.set(this.supplierMealsListColDocRef,
					{ mealRef: newMealDocRef });

				// TODO: check to make sure commit executed successfully
				// 10.15.18: should catch any errors but this likely isn't sufficient
				try {
					batch.commit();
				} catch (error) {
					console.error(error);
					throw new Error(error);
				}
			});
	}

	// remove meal & meal reference from supplier's meal collection
	// TODO: rm meal from supplier's collection, too
	removeMeal( mealId: string ): void {
		this.getMeal(mealId).delete();
	}

	// return a doc reference to a specific meal
	getMeal( mealId: string ): firebase.firestore.DocumentReference {
		return this.mealsColRef.doc(mealId);
	}

	// return a doc reference to a specific meal within a supplier's collection
	getSupplierMeal(): firebase.firestore.DocumentReference {
		return this.supplierMealsListColDocRef;
	}

	// returns all meals as they're ordered in the collection
	getMeals(): firebase.firestore.CollectionReference {
		return this.mealsColRef;
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
