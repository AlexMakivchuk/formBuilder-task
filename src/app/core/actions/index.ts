import { createAction, props } from '@ngrx/store';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { User } from 'src/app/shared/models/user';
import { Message } from 'src/app/shared/models/message';


export const updateFormItem = createAction('add/move Item', props<{ payload: NameValueInterface[] }>());

export const updateFormItemById = createAction('Update Item', props<{ payload: NameValueInterface }>());

export const logIn = createAction('[Login Page] Login', props<{ payload: User }>());

export const registrateUser = createAction('[Registration Page] Registration', props<{ payload: User}>());

export const logOut = createAction('[formBuilder Page] LogOut');

export const loginSuccess = createAction('[Login Page] Login Success');

export const messageAuth = createAction('[Auth Page] message', props<{ payload: Message }>());
