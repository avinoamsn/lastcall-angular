import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/user/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.page.html',
	styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
	public signupForm: FormGroup;
	private loading: HTMLIonLoadingElement;

	constructor(
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private router: Router,
	) {
		// initialize signup form w/ validators
		this.signupForm = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
			userType: ['', Validators.compose([Validators.required])],
		});
	}

	ngOnInit() {}

	// determine form validity & register the user with AuthService
	async signupUser(signupForm: FormGroup): Promise<void> {

		if (!signupForm.valid) {
			console.log('Form is not valid yet, current value: ', signupForm.value);
		} else {
			const email = signupForm.value.email;
			const password = signupForm.value.password;
			const userType = signupForm.value.userType;

			this.authService.signupUser(email, password, userType).then(() => {
				this.loading.dismiss().then(() => {
					this.router.navigateByUrl('home');
				});
			},
				error => {
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
}
