import { createAction, props } from '@ngrx/store';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { User } from 'src/app/shared/models/user';


export const updateFormItem = createAction('addItem', props<{ payload: NameValueInterface[] }>());

export const login = createAction('[Login Page] Login', props<{ payload: User }>());

export const loginSuccess = createAction('[Login Page] Login Success');

export const errorLogin = createAction('[Login Page] error', (error: any) => (error));

