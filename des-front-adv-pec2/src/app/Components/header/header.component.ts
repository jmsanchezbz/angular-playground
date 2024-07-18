import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { logout } from "src/app/auth/actions/auth.actions";
//import { HeaderMenus } from "src/app/Models/header-menus.dto";
//import { HeaderMenusService } from "src/app/Services/header-menus.service";
//import { LocalStorageService } from "src/app/Services/local-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;
  showNoAuthSection: boolean;

  access_token!: string | null;

  constructor(
    private router: Router,
    private store: Store<AppState>
    /*private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService*/
  ) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
  }

  ngOnInit(): void {
    this.store.select("auth").subscribe((auth) => {
      this.access_token = auth.credentials.access_token;
      if (this.access_token) {
        this.showAuthSection = true;
        this.showNoAuthSection = false;
      } else {
        this.showAuthSection = false;
        this.showNoAuthSection = true;
      }
    });
    /*
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
          this.showNoAuthSection = headerInfo.showNoAuthSection;
        }
      }
    );*/
  }

  dashboard(): void {
    this.router.navigateByUrl("dashboard");
  }

  home(): void {
    this.router.navigateByUrl("home");
  }

  login(): void {
    this.router.navigateByUrl("login");
  }

  register(): void {
    this.router.navigateByUrl("register");
  }

  adminPosts(): void {
    this.router.navigateByUrl("posts");
  }

  adminCategories(): void {
    this.router.navigateByUrl("categories");
  }

  profile(): void {
    this.router.navigateByUrl("profile");
  }

  logout(): void {
    this.store.dispatch(logout());

    /*
    this.localStorageService.remove("user_id");
    this.localStorageService.remove("access_token");

    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true,
    };

    this.headerMenusService.headerManagement.next(headerInfo);
    */

    this.router.navigateByUrl("home");
  }
}
