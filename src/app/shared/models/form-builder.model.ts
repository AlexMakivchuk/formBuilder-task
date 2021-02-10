import { NameValueInterface } from 'src/app/shared/models/name-value-interface';

export interface FormBuilderModel {
  id?: number;
  userId?: number;
  builderArray: NameValueInterface[];
  generalStyles: NameValueInterface;
}
