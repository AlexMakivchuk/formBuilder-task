import {IStyles} from '../models/i-styles';
import {OptionsNameValue} from '../models/name-value-interface';

export const INPUT_STYLES: IStyles = {
  width: { value: '200', units: 'px' },
  height: { value: '50', units: 'px' },
  border: { value: '1', units: 'px solid black' },
  borderColor: { value: 'black', units: '' },
  borderRadius: { value: '25', units: 'px' },
  margin: { value: '5', units: 'px' },
  padding: { value: '5', units: 'px' },
  label: { value: 'label', units: '' },
  placeholder: { value: 'input', units: '' },
  value: { value: 'input', units: '' },
};

export const SELECT_STYLES: IStyles = {
  width: { value: '200', units: 'px' },
  height: { value: '50', units: 'px' },
  border: { value: '1', units: 'px solid black' },
  borderColor: { value: 'black', units: '' },
  borderRadius: { value: '25', units: 'px' },
  margin: { value: '5', units: 'px' },
  padding: { value: '5', units: 'px' },
};


export const CHECKBOX_STYLES: IStyles = {};
export const BUTTON_STYLES: IStyles = {};

export const CONST_OPTIONS: OptionsNameValue[] = [
  { value: 'option-0', name: 'option-0' },
  { value: 'option-1', name: 'option-1' },
  { value: 'option-2', name: 'option-2' }
];
