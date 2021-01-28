import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NameValueInterface } from '../../models/name-value-interface';
import { IStyles } from '../../models/i-styles';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: boolean;
  @Input() inputClass;
  @Input() hasError;
  @Input() element: NameValueInterface;
  @Input() submited: boolean;
  @Input() type: string;
  @Input()
  set value(value: any) {
    this._value = value;
    this.writeValue(value);
  }

  get value(): any {
    return this._value;
  }

  constructor() {
  }

  // tslint:disable-next-line:variable-name
  _value: any = 'input';
  onChange = (value) => {
  }
  onTouched = () => {
  }

  ngOnInit(): void {

  }

  writeValue(value): void {
    this.onChange(value);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  addStyle(): IStyles {
    const styles = {};
    if (this.type === 'form') {
      Object.keys(this.element.styles).forEach((key, index) => {
        styles[key] = this.element.styles[key].value + this.element.styles[key].units;
      });
      return styles;
    }
  }
}

