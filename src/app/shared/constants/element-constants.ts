import { IStyles } from 'src/app/shared/models/i-styles';
import { OptionsNameValue } from 'src/app/shared/models/name-value-interface';

export const GENERAL_STYLES: IStyles = {
  width: { value: '450', units: 'px' },
  height: { value: '450', units: 'px' },
  border: { value: '1', units: 'px' },
  borderStyle: { value: 'solid', units: '' },
  borderColor: { value: 'black', units: '' },
  borderRadius: { value: '25', units: 'px' },
  margin: { value: '5', units: 'px' },
  padding: { value: '5', units: 'px' },
};

export const INPUT_STYLES: IStyles = {
  width: { value: '200', units: 'px' },
  height: { value: '50', units: 'px' },
  border: { value: '1', units: 'px' },
  borderStyle: { value: 'solid', units: '' },
  borderColor: { value: 'black', units: '' },
  fontSize: { value: '14', units: 'px' },
  fontWeight: { value: 'normal', units: '' },
  borderRadius: { value: '25', units: 'px' },
  margin: { value: '5', units: 'px' },
  padding: { value: '5', units: 'px' },
  label: { value: 'label', units: '' },
  placeholder: { value: 'placeholder', units: '' },
};

export const TEXTAREA_STYLES: IStyles = {
  width: { value: '200', units: 'px' },
  height: { value: '100', units: 'px' },
  border: { value: '1', units: 'px' },
  borderStyle: { value: 'solid', units: '' },
  borderColor: { value: 'black', units: '' },
  borderRadius: { value: '5', units: 'px' },
  fontSize: { value: '14', units: 'px' },
  fontWeight: { value: 'normal', units: '' },
  margin: { value: '5', units: 'px' },
  padding: { value: '5', units: 'px' },
  label: { value: 'label', units: '' },
  placeholder: { value: 'placeholder', units: '' },
};

export const SELECT_STYLES: IStyles = {
  width: { value: '200', units: 'px' },
  height: { value: '50', units: 'px' },
  border: { value: '1', units: 'px' },
  borderStyle: { value: 'solid', units: '' },
  borderColor: { value: 'black', units: '' },
  borderRadius: { value: '25', units: 'px' },
  fontSize: { value: '14', units: 'px' },
  fontWeight: { value: 'normal', units: '' },
  margin: { value: '5', units: 'px' },
  padding: { value: '5', units: 'px' },
};

export const CHECKBOX_STYLES: IStyles = {
  width: { value: '1', units: 'px' },
  height: { value: '1', units: 'px' },
  border: { value: '1', units: 'px' },
  borderRadius: { value: '1', units: 'px' },
  margin: { value: '5', units: 'px' },
  padding: { value: '5', units: 'px' },
  label: { value: 'checkbox', units: '' },
  fontSize: { value: '14', units: 'px' },
  fontWeight: { value: 'normal', units: '' },
  color: { value: 'black', units: '' },
};

export const BUTTON_STYLES: IStyles = {
  width: { value: '120', units: 'px' },
  height: { value: '40', units: 'px' },
  border: { value: '1', units: 'px' },
  borderStyle: { value: 'solid', units: '' },
  borderColor: { value: 'black', units: '' },
  borderRadius: { value: '20', units: 'px' },
  fontSize: { value: '14', units: 'px' },
  fontWeight: { value: 'normal', units: '' },
  margin: { value: '5', units: 'px' },
  padding: { value: '5', units: 'px' },
  label: { value: 'click', units: '' },
  color: { value: '', units: '' }

};

export const CONST_OPTIONS: OptionsNameValue[] = [
  { name: 'option-name-0', value: 'option-0' },
  { name: 'option-name-1', value: 'option-1' },
  { name: 'option-name-2', value: 'option-2' }
];

export const BORDER_STYLES = [
  'dotted',
  'dashed',
  'solid',
  'double',
];

export const FONT_STYLES = [
  'normal',
  'italic',
  'oblique'
];

export const FONT_WEIGHT = [
  'bold',
  'bolder',
  'lighter',
  'normal'
];

export const AUTH_INPUT_FIELDS_NAMES = {
  email: 'email',
  password: 'password',
  name: 'name',
  surname: 'surname',
  agree: 'agree'
};


