import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
//import { LocalStorageService } from "../Services/local-storage.service";
import { AppState } from "../app.reducer";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  private access_token: string = '';

  constructor(
    private router: Router,
    private store: Store<AppState>
    //private localStorageService: LocalStorageService
  ) {
    this.store.select("auth").subscribe((auth) => {
      this.access_token = auth.credentials.access_token;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //const access_token = this.localStorageService.get("access_token");
    if (this.access_token.length > 0) {
      // logged in so return true
      return true;
    }

    this.router.navigate(["/login"]);

    return false;
  }
}
