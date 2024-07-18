import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { AuthService } from "src/app/Services/auth.service";
import { login, loginError, loginSuccess } from "../actions/auth.actions";
import { of } from "rxjs";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      tap((action) => console.log("------Effect login:TAP", action)),
      map((action) => {
        console.log("------Effect login:MAP", action);
        const authDto = {
          email: action.email,
          password: action.password,
          user_id: "",
          access_token: "",
        };
        return authDto;
      }),
      mergeMap((credentials) => {
        console.log("------Effect login:MERGE_MAP", credentials);
        const login$ = this.authService.login(credentials).pipe(
          map((res) => {
            console.log("------Effect login:RES", res);
            return loginSuccess({ payload: res });
          }),
          catchError((err) => {
            console.log("------Effect login:ERR", err.error);

            return of(loginError({ payload: err.error }));
          })
        );
        return login$;
      })
    )
  );
}
