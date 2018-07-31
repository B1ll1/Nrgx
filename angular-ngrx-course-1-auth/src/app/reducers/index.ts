import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { AuthActionTypes } from '../auth/auth.actions';
import { AuthState } from '../auth/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
