import { Component, Input, OnInit } from '@angular/core';

import { NameValueInterface } from 'src/app/shared/models/name-value-interface';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() element: NameValueInterface;
  @Input() disabled: boolean;
  @Input() type: string;
  constructor() { }

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

  private onChange = (value: number) => {};

  private onTouched = () => {};

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
