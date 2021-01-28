import { Component, Input, OnInit } from '@angular/core';
import { NameValueInterface } from '../../models/name-value-interface';
import { IStyles } from '../../models/i-styles';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  options = [];
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
    this.options = this.element.options.slice();
    this._value = this.options[0].value;

  }

  addStyle(): IStyles {
    const styles = {};
    if (this.type === 'form') {
      Object.keys(this.element.styles).forEach((key) => {
        styles[key] = this.element.styles[key].value + this.element.styles[key].units;
      });
      return styles;
    }
  }

  change(): void {
  }

}
