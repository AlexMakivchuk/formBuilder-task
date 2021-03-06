import { IStyles } from 'src/app/shared/models/i-styles';

export interface NameValueInterface {
  name: string;
  value: string;
  id?: string;
  type?: string;
  styles: IStyles;
  required?: boolean;
  options?: OptionsNameValue[];
}

export interface OptionsNameValue {
  name: string;
  value: string;
}
