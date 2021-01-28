import {NameValueInterface} from './name-value-interface';

export interface FormBuilderModel {
  id?: number;
  userId?: number;
  builderArray: NameValueInterface[];
}
