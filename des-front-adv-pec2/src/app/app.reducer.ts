import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './auth/reducers';

export interface AppState {
    auth: reducers.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: reducers.authReducer
}
