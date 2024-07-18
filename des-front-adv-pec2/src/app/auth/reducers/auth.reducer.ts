import { createReducer, on } from "@ngrx/store";
import {
  login,
  loginError,
  loginSuccess,
  logout,
} from "../actions/auth.actions";
import { AuthDTO } from "src/app/Models/auth.dto";

export interface AuthState {
  credentials: AuthDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AuthState = {
  credentials: AuthDTO.new(),
  loading: false,
  loaded: false,
  error: null,
};

const _reducer = createReducer(
  initialState,
  on(login, (state, { email, password }) => state),
  on(loginSuccess, (state, { payload }) => ({
    ...state,
    credentials: {
      ...state.credentials,
      user_id: payload.user_id,
      access_token: payload.access_token,
    },
    loading: false,
    loaded: true,
  })),
  on(loginError, (state, { payload }) => ({
    ...state,
    credentials: {
      ...state.credentials,
      user_id: payload.user_id,
      access_token: payload.access_token,
    },
    loading: false,
    loaded: false,
    error: payload,
  })),
  on(logout, (state) => ({
    credentials: AuthDTO.new(),
    loading: false,
    loaded: false,
    error: null,
  }))
);

export function authReducer(state: any, action: any) {
  return _reducer(state, action);
}
