import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor() { }

	// login user with firebase auth
	loginUser(email: string, password: string): Promise<any> {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	// logout user
	logoutUser(): Promise<void> {
		return firebase.auth().signOut();
	}

	// register user with firebase auth
	signupUser(email: string, password: string): Promise<any> {
		return firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(newUserCredential => {
			firebase.firestore().doc(`/users/${newUserCredential.user.uid}`).set({ email });
		})
		.catch(error => {
			console.error(error);
			throw new Error(error);
		});
	}

	// email password reset
	resetPassword(email: string): Promise<void> {
		return firebase.auth().sendPasswordResetEmail(email);
	}
}
