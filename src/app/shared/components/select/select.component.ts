import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NameValueInterface, OptionsNameValue } from 'src/app/shared/models/name-value-interface';
import { IStyles } from 'src/app/shared/models/i-styles';
import { StylesService } from 'src/app/shared/services/styles.service';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: [ './select.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() options: OptionsNameValue[] = [];
  disabled: boolean;
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

  constructor(private stylesService: StylesService) { }

  // tslint:disable-next-line:variable-name
  _value: any;

  onChange = (value) => {
  }

  onTouched = () => {
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

  ngOnInit(): void {
    if (this.element) {
      this.options = this.element.options.slice();
    }
    this._value = this.options[0].value;
  }

  addStyle(): IStyles {
    if (this.type === 'form') {
      return this.stylesService.createStyleObject(this.element.styles);
    }
    return {};
  }
}
