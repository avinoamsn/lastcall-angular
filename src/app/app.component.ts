import { Component } from '@angular/core';
// import { Plugins } from '@capacitor/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Platform } from '@ionic/angular';

import * as firebase from 'firebase/app';
import { firebaseConfig } from './credentials';

// TODO: add capacitor support for location etc
// const { SplashScreen, StatusBar } = Plugins;

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar
	) {
		firebase.initializeApp(firebaseConfig);
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
}
