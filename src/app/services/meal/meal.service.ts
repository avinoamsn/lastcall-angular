import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { ProfileService } from '../user/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { convertDataToISO } from 'ionic-angular/util/datetime-util'; // planned on using this to remedy the date formatting problem

@Injectable({
	providedIn: 'root'
})
export class MealService {
	public supplierMealsListColDocRef: firebase.firestore.DocumentReference; 	// reference to the doc of a meal in a supplier's collection
	public mealsColRef: firebase.firestore.CollectionReference;	// reference to the /meals/ collection
	public userTypeColUserDocRef: firebase.firestore.DocumentReference; // doc reference to the current user in the `/${userType}s/` collection
	public userType: any;

	constructor(
		public profileService: ProfileService,
	) {
		this.mealsColRef = firebase.firestore().collection(`/meals/`);
		this.userType = profileService.getUserType();
	}

	// (for suppliers) add meal
	async addMeal( mealCreateForm: FormGroup ): Promise<void> {
			const batch = firebase.firestore().batch(); // for batch commit to /meals/ and supplier's meal list
			const newMealDocRef = this.mealsColRef.doc(); // document reference to the new meal

			this.userTypeColUserDocRef = await this.profileService.getUserTypeColUserDocRef();
			this.supplierMealsListColDocRef = await firebase.firestore().collection(`/suppliers/${this.userTypeColUserDocRef.id}/meals/`).doc();

			// add meal doc to meals collection
			// TODO: normalize the dates passed (Ionic displays an ISO format but passes an unfriendly object)
			batch.set(newMealDocRef, {
				supplierRef: this.userTypeColUserDocRef,
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

			console.log(mealCreateForm.value.availabilityWindowStart);

			// add meal reference to meals list under supplier
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

	// returns all meals from a specific supplier's list
	// This method DOES NOT search through the /meals/ collection, it goes through the array of meal references from within the supplier doc
	getMealsBySupplier( supplierId: string ) {
		
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
