import { createAction, props } from "@ngrx/store";

export const login = createAction(
  "auth/login",
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  "auth/login/success",
  props<{ payload: any }>()
);

export const loginError = createAction(
  "auth/login/error",
  props<{ payload: any }>()
);

export const logout = createAction("auth/logout");
