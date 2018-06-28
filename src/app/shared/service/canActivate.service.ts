import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
  ) { }
  canActivate(nextRoute: ActivatedRouteSnapshot, nextState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //this.currentRoute vs nextRoute some logiz 
    let nextUrl = nextState.url;
    let currentUrl = this.router.url;
    return new Promise<boolean>((resolve, reject) => {
      console.log("canActivate");
      console.log("nextUrl"+nextUrl);
      console.log("currentUrl"+currentUrl);
      setTimeout(() => {
        resolve(true);
      }, 5000);
    });
  }

}
