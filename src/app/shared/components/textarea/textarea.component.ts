import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';
import { IStyles } from 'src/app/shared/models/i-styles';
import { StylesService } from 'src/app/shared/services/styles.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: [ './textarea.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  disabled: boolean;

  @Input()
  set value(value: any) {
    this._value = value;
    this.writeValue(value);
  }

  get value(): any {
    return this._value;
  }

  @Input() hasError;
  @Input() element: NameValueInterface;
  @Input() submited: boolean;
  @Input() type: string;

  // tslint:disable-next-line:variable-name
  _value: any;

  constructor(private stylesService: StylesService) { }

  ngOnInit(): void { }

  writeValue(value: number): void {
    this.onChange(this.value);
  }

  private onChange = (value: number) => {
  }

  private onTouched = () => {
  }

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
    if (this.type === 'form') {
      return this.stylesService.createStyleObject(this.element.styles);
    }
    return {};
  }

}
