import { createReducer, createSelector, on } from '@ngrx/store';

import * as actions from 'src/app/core/actions';
import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { User } from 'src/app/shared/models/user';
import { Message } from 'src/app/shared/models/message';

export interface CoreState {
  formItems: NameValueInterface[];
  generalStyles: NameValueInterface;
  userState: User;
  isAuth: boolean;
  authMessage: Message;
}

const initState: CoreState = {
  formItems: [],
  generalStyles: null,
  userState: null,
  isAuth: false,
  authMessage: { text: '', type: '' }
};

export interface State {
  core: CoreState;
}

export const reducer = createReducer(
  initState,
  on(actions.updateFormItem, (state, { payload }): CoreState => ({
    ...state,
    formItems: payload
  })),
  on(actions.updateFormItemById, (state, { payload }): CoreState => ({
    ...state,
    formItems: state.formItems.map(elem => elem.id === payload.id ? {
      ...elem,
      styles: payload.styles,
      options: payload.options,
      required: payload.required
    } : elem)
  })),
  on(actions.addGeneralStyles, (state, { payload }): CoreState => ({
    ...state,
    generalStyles: payload
  })),
  on(actions.loginSuccess, (state): CoreState => ({
    ...state,
    isAuth: true
  })),
  on(actions.logOut, (state): CoreState => ({
    ...state,
    isAuth: false,
  })),
  on(actions.messageAuth, (state, { payload }): CoreState => ({
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

export const getGeneralStyles = createSelector(
  getCoreState,
  (state: CoreState): NameValueInterface => state.generalStyles
);

export const getAuthState = createSelector(
  getCoreState,
  (state: CoreState): boolean => state.isAuth
);

export const getAuthMessage = createSelector(
  getCoreState,
  (state) => state.authMessage
);
