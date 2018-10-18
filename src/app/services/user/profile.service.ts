import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	private userColUserDocRef: firebase.firestore.DocumentReference;	// doc reference to the current user in the `/users/` collection
	// tslint:disable-next-line:max-line-length
	private userTypeColUserDocRef: firebase.firestore.DocumentReference; // doc reference to the current user in the `/${userType}s/` collection
	private currentUser: firebase.User; // user object
	public userType: any;
	public profileSnapshot: firebase.firestore.DocumentReference;

	constructor() {
		// auth state listener
		firebase.auth().onAuthStateChanged( user => {
			if (user) {
				this.currentUser = user;
				this.userColUserDocRef = firebase.firestore().doc(`/users/${user.uid}`);

				// identifies & sets local userType collection for batch writes
				// TODO: can this be moved to an async/await structure, maybe outside of the constructor?
				this.userColUserDocRef.get().then( snap => {
					this.userTypeColUserDocRef = firebase.firestore().doc(`/${snap.data().userType}s/${user.uid}`);
					this.userType = snap.data().userType;
				});
			}
		});
	}

	// return the userType
	async getUserType(): Promise<string> {
		const snap = await this.userColUserDocRef.get();
		this.userType = await snap.data().userType;
		return this.userType;
	}

	// returns the document reference to the user in the `/users/` collection
	getUserColUserDocRef(): firebase.firestore.DocumentReference {
		return this.userColUserDocRef;
	}

	// returns the document reference to the user in the `/{userType}s/` collection
	async getUserTypeColUserDocRef(): Promise<firebase.firestore.DocumentReference> {
		return await this.userTypeColUserDocRef;
	}

	updateName(firstName: string, lastName: string): Promise<any> {
		const batch = firebase.firestore().batch();

		batch.update(this.userColUserDocRef, { firstName, lastName });
		batch.update(this.userTypeColUserDocRef, { firstName, lastName });

		return batch.commit();
	}

	// update email in DB & in authentication service
	async updateEmail(newEmail: string, password: string): Promise<any> {
		const batch = firebase.firestore().batch();
		const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password);

		// firebase must reauthenticate before updating credentials
		await this.currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
		await this.currentUser.updateEmail(newEmail);

		batch.update(this.userColUserDocRef, { email: newEmail });
		batch.update(this.userTypeColUserDocRef, { email: newEmail });

		return batch.commit();
	}

	// update password in DB & log to console
	async updatePassword(newPassword: string, oldPassword: string): Promise<any> {
		const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);

		await this.currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
		await this.currentUser.updatePassword(newPassword);
		console.log('Password changed.');
	}
}
