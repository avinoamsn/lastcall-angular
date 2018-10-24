import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/user/profile.service';
import { Router } from '@angular/router';
import { MenuController } from 'ionic-angular';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	private userType: string;
	private activeMenu: string;
	private menuCtrl: MenuController;

	constructor(
		private profileService: ProfileService,
		private router: Router,
	) {}

	async ngOnInit() {}

	// route to signup page
	signUp() {
		this.router.navigateByUrl('signup');
	}

	// route to login page
	signIn() {
		this.router.navigateByUrl('login');
	}

	openMenu() {
		this.menuCtrl.open();
	}
}
