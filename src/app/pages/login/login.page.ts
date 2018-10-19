import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';
import { ProfileService } from '../../services/user/profile.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	public loginForm: FormGroup;
	private loading: HTMLIonLoadingElement;
	private userType: string;

	constructor(
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		private authService: AuthService,
		private profileService: ProfileService,
		private formBuilder: FormBuilder,
		private router: Router,
	) {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
		});
	}

	ngOnInit() {}

	// determines the login form validity & logs in the user
	async loginUser(loginForm: FormGroup): Promise<void> {

		if (!loginForm.valid) {
			console.log('Form is not valid yet, current value: ', loginForm.value);
		} else {
			const email = loginForm.value.email;
			const password = loginForm.value.password;

			this.authService.loginUser(email, password).then(() => {
				this.loading.dismiss().then(async () => {
					this.userType = await	this.profileService.getUserType();
					this.rerouteToUserDashboard( this.userType );
				});
			}, error => {
					this.loading.dismiss().then(async () => {
						const alert = await this.alertCtrl.create({
							message: error.message,
							buttons: [{ text: 'Ok', role: 'cancel' }],
						});
						await alert.present();
					});
			});

			this.loading = await this.loadingCtrl.create();
			await this.loading.present();
		}
	}

	// reroute user to the correct dashboard, based on userType
	// TODO: guard against users getting to the alternate dash by manually entering URL
	async rerouteToUserDashboard( userType: string ) {
		console.log(userType);

		if (userType === 'supplier') {
			this.router.navigateByUrl('dashboard-supplier');
		} else {
			this.router.navigateByUrl('dashboard-subscriber');
		}
	}
}
