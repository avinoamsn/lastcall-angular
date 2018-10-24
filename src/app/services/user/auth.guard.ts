import { Injectable } from '@angular/core';

import { CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
	providedIn: 'root'
})
/*
 *	If auth state changed, check to see if user is logged in:
 *	true: continue unobstructed
 *	false: reroute to home page
 */
export class AuthGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
			return new Promise((resolve, reject) => {
				// auth state listener
				firebase.auth().onAuthStateChanged((user: firebase.User) => {
					if (user) {
						console.log('User is logged in.');
						resolve(true);
					} else {
						console.log('User is not logged in.');
						this.router.navigate(['']);
						resolve(false);
					}
				});
			});
		}
}
