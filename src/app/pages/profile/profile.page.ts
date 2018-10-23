import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
	public userProfile: any; // 'any' type is used b/c TSlint declares it as a type specific to this directory. I'm not yet sure why that is.

	constructor(
		private alertCtrl: AlertController,
		private authService: AuthService,
		private profileService: ProfileService,
		private router: Router
	) {}

	ngOnInit() {
		// listener for user profile
		this.profileService.getUserColUserDocRef().onSnapshot( snap => {
			this.userProfile = snap.data();
		});
	}

	// logs out the user
	logOut(): void {
		this.authService.logoutUser().then( () => {
			this.router.navigateByUrl('login');
		});
	}

	// ion alert to update the user's name
	async updateName(): Promise<void> {
		const alert = await this.alertCtrl.create({
			subHeader: 'Your first and name',
			inputs: [
				{
					type: 'text',
					name: 'firstName',
					placeholder: 'Your first name',
					value: this.userProfile.firstName,
				},
				{
					type: 'text',
					name: 'lastName',
					placeholder: 'Your last name',
					value: this.userProfile.lastName,
				},
			],
			buttons: [
				{ text: 'Cancel' },
				{
					text: 'Save',
					handler: data => {
						this.profileService.updateName(data.firstName, data.lastName);
					},
				},
			],
		});

		await alert.present();
	}

	// ion alert to update the user's email
	async updateEmail(): Promise<void> {
		const alert = await this.alertCtrl.create({
			inputs: [
				{ type: 'text', name: 'newEmail', placeholder: 'Your new email' },
				{ name: 'password', placeholder: 'Your password', type: 'password' }
			],
			buttons: [
				{ text: 'Cancel' },
				{
					text: 'Save',
					handler: data => {
						this.profileService.updateEmail(data.newEmail, data.password)
						.then(() => {
							console.log('Email changed successfully.');
						})
						.catch(error => {
							console.log('ERROR: ' + error.message);
						});
					},
				}
			]
		});

		await alert.present();
	}

	// ion alert to update the user's password
	async updatePassword(): Promise<void> {
		const alert = await this.alertCtrl.create({
			inputs: [
				{ name: 'newPassword', placeholder: 'New password', type: 'password' },
				{ name: 'oldPassword', placeholder: 'Old password', type: 'password' },
			],
			buttons: [
				{ text: 'Cancel' },
				{
					text: 'Save',
					handler: data => {
						this.profileService.updatePassword(data.newPassword, data.oldPassword);
					}
				},
			],
		});

		await alert.present();
	}
}
