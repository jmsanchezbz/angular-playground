import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
//import { of, throwError } from "rxjs";
//import { catchError, finalize } from "rxjs/operators";
import { AppState } from "src/app/app.reducer";
import { login } from "src/app/auth/actions/auth.actions";
import { AuthDTO } from "src/app/Models/auth.dto";
//import { HeaderMenus } from "src/app/Models/header-menus.dto";
//import { AuthService, AuthToken } from "src/app/Services/auth.service";
//import { HeaderMenusService } from "src/app/Services/header-menus.service";
//import { LocalStorageService } from "src/app/Services/local-storage.service";
import { SharedService } from "src/app/Services/shared.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: UntypedFormControl;
  password: UntypedFormControl;
  loginForm: UntypedFormGroup;

  private access_token: string | null = null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    //private authService: AuthService,
    private sharedService: SharedService,
    //private headerMenusService: HeaderMenusService,
    //private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginUser = new AuthDTO("", "", "", "");

    this.email = new UntypedFormControl("", [
      Validators.required,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]);

    this.password = new UntypedFormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.store
      .select((AppState) => AppState.auth.credentials.access_token)
      .subscribe(async (token) => {
        responseOK = true;

        if (token) {
          this.access_token = token;

          await this.sharedService.managementToast(
            "loginFeedback",
            responseOK,
            errorResponse
          );
          
          this.router.navigateByUrl("home");
        }
      });

    this.store
      .select((AppState) => AppState.auth.error)
      .subscribe(async (error) => {
        responseOK = false;

        if (error) {
          await this.sharedService.managementToast(
            "loginFeedback",
            responseOK,
            error
          );
          this.sharedService.errorLog(error);
        }
      });
  }

  async login(): Promise<void> {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;

    this.store.dispatch(
      login({
        email: this.loginUser.email,
        password: this.loginUser.password,
      })
    );

    /*
    this.authService
      .login(this.loginUser)
      .pipe(
        catchError((err) => {
          console.log("------pipe:catchError", err);

          return throwError(err);
        }),
        finalize(async () => {
          console.log("------pipe:Finalize", errorResponse);

          await this.sharedService.managementToast(
            "loginFeedback",
            responseOK,
            errorResponse
          );

          if (responseOK) {
            const headerInfo: HeaderMenus = {
              showAuthSection: true,
              showNoAuthSection: false,
            };
            // update options menu
            this.headerMenusService.headerManagement.next(headerInfo);
            this.router.navigateByUrl("home");
          } else {
            const headerInfo: HeaderMenus = {
              showAuthSection: false,
              showNoAuthSection: true,
            };
            this.headerMenusService.headerManagement.next(headerInfo);
          }
        })
      )
      .subscribe(
        (res) => {
          console.log("------subscribe ok");

          responseOK = true;

          const authToken = res as AuthToken;
          this.loginUser.user_id = authToken.user_id;
          this.loginUser.access_token = authToken.access_token;
          // save token to localstorage for next requests
          this.localStorageService.set("user_id", this.loginUser.user_id);
          this.localStorageService.set(
            "access_token",
            this.loginUser.access_token
          );
        },
        (err) => {
          console.log("------subscribe ko");
          responseOK = false;
          errorResponse = err.error;
          this.sharedService.errorLog(errorResponse);
        },
        () => {
          console.log("------finally");
        }
      );
      */
  }
}
