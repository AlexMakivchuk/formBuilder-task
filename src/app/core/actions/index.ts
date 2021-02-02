import { createAction, props } from '@ngrx/store';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';

export const updateFormItem = createAction('addItem', props<{ payload: NameValueInterface[] }>());

