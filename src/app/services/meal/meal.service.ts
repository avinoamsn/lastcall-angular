import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MealService {
	public mealListRef: firebase.firestore.CollectionReference;

	constructor() { }
}
