import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor() {}

	// login user with firebase auth
	loginUser(email: string, password: string): Promise<any> {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	// logout user
	logoutUser(): Promise<void> {
		return firebase.auth().signOut();
	}

	// register user with firebase auth
	async signupUser(email: string, password: string, userType: string): Promise<any> {
		// batch update for atomic writes in two collections (/users/, /${userType}/)
		const batch = firebase.firestore().batch();

		try {
			const newUserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

			batch.set(firebase.firestore().doc(`/${userType}s/${newUserCredential.user.uid}`), { email, userType });
			batch.set(firebase.firestore().doc(`/users/${newUserCredential.user.uid}`), { email, userType });

			batch.commit();
		} catch (error) {
			console.error(error);
			throw new Error(error);
		}
	}

	// email password reset
	resetPassword(email: string): Promise<void> {
		return firebase.auth().sendPasswordResetEmail(email);
	}

}
