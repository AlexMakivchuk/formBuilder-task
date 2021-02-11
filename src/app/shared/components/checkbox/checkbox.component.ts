import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { IStyles } from 'src/app/shared/models/i-styles';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [ './checkbox.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements OnInit {
  @Input() element: NameValueInterface;
  @Input() disabled: boolean;
  @Input() type: string;
  @Input() name: string;
  @Input() label: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.writeValue(value);
  }

  _value: any;

  writeValue(value: number): void {
    this.onChange(this.value);
  }

  private onChange = (value: number) => {
  };

  private onTouched = () => {
  };

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  addStyle(): IStyles {
    const styles = {};
    if (this.type === 'form') {
      Object.keys(this.element.styles).forEach(key => {
        styles[key] = this.element.styles[key].value + this.element.styles[key].units;
      });
      return styles;
    }
  }

}
