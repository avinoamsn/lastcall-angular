import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	private userProfileUserColDocRef: firebase.firestore.DocumentReference;	// doc reference to the current user in the `/users/` collection
	// tslint:disable-next-line:max-line-length
	private userProfileTypeColDocRef: firebase.firestore.DocumentReference; // doc reference to the current user in the `/${userType}s/` collection
	private currentUser: firebase.User; // user object
	public userType: any;

	constructor() {
		// auth state listener
		firebase.auth().onAuthStateChanged( user => {
			if (user) {
				this.currentUser = user;
				this.userProfileUserColDocRef = firebase.firestore().doc(`/users/${user.uid}`);

				// identifies & sets local userType collection for batch writes
				this.userProfileUserColDocRef.get().then( snap => {
					this.userProfileTypeColDocRef = firebase.firestore().doc(`/${snap.data().userType}s/${user.uid}`);
					this.userType = snap.data().userType;
				});
			}
		});
	}

	getUserProfile(): firebase.firestore.DocumentReference {
		return this.userProfileUserColDocRef;
	}

	// return the userType
	getUserType(): string {
		return this.userType;
	}

	updateName(firstName: string, lastName: string): Promise<any> {
		const batch = firebase.firestore().batch();

		batch.update(this.userProfileUserColDocRef, { firstName, lastName });
		batch.update(this.userProfileTypeColDocRef, { firstName, lastName });

		return batch.commit();
	}

	// update email in DB & in authentication service
	async updateEmail(newEmail: string, password: string): Promise<any> {
		const batch = firebase.firestore().batch();
		const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password);

		// firebase must reauthenticate before updating credentials
		await this.currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
		await this.currentUser.updateEmail(newEmail);

		batch.update(this.userProfileUserColDocRef, { email: newEmail });
		batch.update(this.userProfileTypeColDocRef, { email: newEmail });

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