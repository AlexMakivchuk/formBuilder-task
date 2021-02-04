import { createReducer, createSelector, on } from '@ngrx/store';

import * as actions from 'src/app/core/actions';
import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { User } from 'src/app/shared/models/user';
import { Message } from 'src/app/shared/models/message';


export interface CoreState {
  formItems: NameValueInterface[];
  userState: User;
  isAuth: boolean;
  authMessage: Message;
}

const initState: CoreState = {
  formItems: [],
  userState: null,
  isAuth: false,
  authMessage: { text: '', type: '' }
};

export interface State {
  core: CoreState;
}

export const reducer = createReducer(
  initState,
  on(actions.updateFormItem, ( state, { payload }): CoreState => ({
    ...state,
    formItems: payload
  })),
  on(actions.loginSuccess, ( state): CoreState => ({
    ...state,
    isAuth: true
  })),
  on(actions.logOut,  (state): CoreState => ({
    ...state,
    isAuth: false,
    formItems: [],
  })),
  on(actions.messageAuth, (state, { payload } ): CoreState => ({
    ...state,
    authMessage: { ...payload }
  })),
);

export const reducers = {
  core: reducer
};

export const getCoreState = (state: State): CoreState => state.core;

export const getFormItems = createSelector(
  getCoreState,
  (state: CoreState): NameValueInterface[] => state.formItems
);

export const getAuthState = createSelector(
  getCoreState,
  (state: CoreState): boolean => state.isAuth
);

export const getAuthMessage = createSelector(
  getCoreState,
  ( state) => state.authMessage
);
