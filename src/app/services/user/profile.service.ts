import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	public userProfileUserCol: firebase.firestore.DocumentReference;	// doc reference to the current user
	public userProfileTypeCol: firebase.firestore.DocumentReference; // for batch writes
	public currentUser: firebase.User; // user object

	constructor() {
		// auth state listener
		firebase.auth().onAuthStateChanged( user => {
			if (user) {
				this.currentUser = user;
				this.userProfileUserCol = firebase.firestore().doc(`/users/${user.uid}`);

				// identifies & sets local userType collection for batch writes
				this.userProfileUserCol.get().then( (snap) => {
					this.userProfileTypeCol = firebase.firestore().doc(`/${snap.data().userType}s/${user.uid}`);
				});
			}
		});
	}

	getUserProfile(): firebase.firestore.DocumentReference {
		return this.userProfileUserCol;
	}

	updateName(firstName: string, lastName: string): Promise<any> {
		const batch = firebase.firestore().batch();

		batch.update(this.userProfileUserCol, { firstName, lastName });
		batch.update(this.userProfileTypeCol, { firstName, lastName });

		return batch.commit();
	}

	// update email in DB & in authentication service
	async updateEmail(newEmail: string, password: string): Promise<any> {
		const batch = firebase.firestore().batch();
		const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password);

		// firebase must reauthenticate before updating credentials
		await this.currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
		await this.currentUser.updateEmail(newEmail);

		batch.update(this.userProfileUserCol, { email: newEmail });
		batch.update(this.userProfileTypeCol, { email: newEmail });

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
