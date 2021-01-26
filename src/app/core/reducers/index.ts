import { NameValueInterface } from '../../shared/models/name-value-interface';
import { createReducer, createSelector, on } from '@ngrx/store';
import * as actions from 'src/app/core/actions';

export interface KeyState {
  formItems: NameValueInterface[];
}

export interface State {
  key: KeyState;
}
const initState: KeyState = {
  formItems: []
};

const reducer = createReducer(
  initState,
  on(actions.updateFormItem, (state, { payload}) => {
    return {
      formItems: [...payload]
    };
  })
);

export const reducers = {
  key: reducer
};

export const getState = (state): State => state;

export const getFormItems = createSelector((state: State) => state,  getState);


