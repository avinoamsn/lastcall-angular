import { Component } from '@angular/core';
import { AuthService } from '../services/user/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	private authService: AuthService;
}

/*logoutUser(): void {
	this.authService,logoutUser().then( () => {
		this.router.navigateByUrl('login');
	});
}*/
