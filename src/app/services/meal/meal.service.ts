import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { ProfileService } from '../user/profile.service';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { convertDataToISO } from 'ionic-angular/util/datetime-util'; // planned on using this to remedy the date formatting problem

@Injectable({
	providedIn: 'root'
})
export class MealService {
	public supplierMealsListColDocRef: firebase.firestore.DocumentReference; 	// reference to the doc of a meal in a supplier's collection
	public mealsColRef: firebase.firestore.CollectionReference;	// reference to the /meals/ collection
	public userTypeColUserDocRef: firebase.firestore.DocumentReference; // doc reference to the current user in the `/${userType}s/` collection
	public userType: any;
	public userId: string;

	constructor(
		public profileService: ProfileService,
	) {
		this.mealsColRef = firebase.firestore().collection(`/meals/`);
		this.userType = profileService.getUserType();
		this.userId = profileService.getUserId();
	}

	// all queries are piped through userTypeCheck before being returned
	// if the userType is supplier, queries are filtered by supplier
	// (assumption is suppliers only need to see their meals)
	userTypeCheck( userType: string, query: any ): firebase.firestore.Query {
		console.log(userType);
		if (userType === 'supplier') {
			const ref = firebase.firestore().collection('suppliers').doc(this.userId);
			return query.where('supplierRef', '==', ref);
		} else {
			return query;
		}
	}

	// (for suppliers) add meal
	// TODO: hold mealRefs in an array, rather than a document collection?
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
				originalPrice: mealCreateForm.value.originalPrice,
				discountPrice: mealCreateForm.value.discountPrice,
				numMeals: mealCreateForm.value.numMeals,
				availabilityWindowStart: mealCreateForm.value.availabilityWindowStart,
				availabilityWindowEnd: mealCreateForm.value.availabilityWindowEnd,
				pickupType: mealCreateForm.value.pickupType,
				coupon: mealCreateForm.value.coupon,
			});

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

	// returns all meals as they're ordered in the collection
	getMeals( userType: string ): firebase.firestore.Query {
		return this.userTypeCheck(userType, this.mealsColRef);
	}

	// returns all meals from a specific supplier (using the referenceType)
	getMealsBySupplier( supplierId: string ): firebase.firestore.Query {
		const ref = firebase.firestore().collection('suppliers').doc(supplierId);
		return this.mealsColRef.where('supplierRef', '==', ref);
	}

	// returns a list of meal references by price, in ascending order
	// TODO: add distance & price filters
	getMealsByPrice( userType: string, /* price: number */ ): firebase.firestore.Query {
		// return this.mealsColRef.where('discountPrice', '<=', price).orderBy('discountPrice', 'asc');
		return this.userTypeCheck(
			userType,
			this.mealsColRef.orderBy('discountPrice', 'asc')
		);
	}

	// returns a list of meal references by proximity to user
	getMealsByDistance( distance: number ): firebase.firestore.Query {
		return null; // TODO
	}

	// returns a list of meal references by expiration date, soonest first
	// TODO: add distance filter
	getMealsByExpirationDate( expDate: string ): firebase.firestore.Query {
		return null; // TODO
	}

	// returns a list of meal references by expiration date, soonest first
	// TODO: add distance filter
	getMealsByTag( tags: Array<string> ): firebase.firestore.Query {
			return null; // TODO
	}
}
