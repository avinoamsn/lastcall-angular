import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { ProfileService } from '../user/profile.service';
import { Timestamp } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MealService {
	private mealsListColRef: firebase.firestore.CollectionReference; // reference to the current list of displayed meals
	// tslint:disable-next-line:max-line-length
	private userProfileTypeColDocRef: firebase.firestore.DocumentReference; // doc reference to the current user in the `/${userType}s/` collection
	private userType: any;

	constructor(
		private profileService: ProfileService,
	) {
		firebase.auth().onAuthStateChanged( user => {
			if (user) {
				this.userType = profileService.getUserType();
				this.userProfileTypeColDocRef = firebase.firestore().doc(`/${this.userType}s/${user.uid}`);

				// if the userType is 'supplier', set mealsListColRef to the meals collection in the user doc. Otherwise, set to /meals/ collection
				if (this.userType === 'suppliers') {
					this.mealsListColRef = firebase.firestore().collection(`${this.userProfileTypeColDocRef}/meals/`);
				}
			}
		});
	}

	// (for suppliers) add meal
	// TODO: pass FormGroup & parse here?
	addMeal(
		supplierId: firebase.firestore.DocumentReference,
		mealName: string,
		mealDescription: string,
		originalPrice: number,
		offerPrice: number,
		numMeals: number,
		availabilityWindowStart: Date,
		availabilityWindowEnd: Date,
		pickupType: Array<boolean>,
		coupon: boolean,
		) {
			const batch = firebase.firestore().batch();
			const newMealRef = firebase.firestore().collection('meals').doc(); // create a reference/tx ID for batch commit

			// add meal doc to meals collection
			batch.update(newMealRef, {
				supplierId: supplierId,
				mealName: mealName,
				mealDescription: mealDescription,
				originalPrice: originalPrice,
				offerPrice: offerPrice,
				numMeals: numMeals,
				availabilityWindowStart: availabilityWindowStart,
				availabilityWindowEnd: availabilityWindowEnd,
				pickupType: pickupType,
				coupon: coupon,
			});

			// add meal reference to meals list under user
			batch.update(newMealRef, this.mealsListColRef);

			// TODO: check to make sure commit executed successfully
			batch.commit();
	}

	// remove meal
	removeMeal() {

	}

	// return a doc reference to a specific meal
	getMeal( mealId: string ): firebase.firestore.DocumentReference {
		return firebase.firestore().collection('meals').doc(mealId);
	}

	// (for suppliers) return a col reference to the meals of a specific supplier
	getSupplierMeals(): firebase.firestore.CollectionReference {
		return this.mealsListColRef;
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
