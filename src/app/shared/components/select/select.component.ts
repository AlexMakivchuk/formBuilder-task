import { Component, Input, OnInit } from '@angular/core';
import { NameValueInterface, OptionsNameValue } from '../../models/name-value-interface';
import { IStyles } from '../../models/i-styles';
import {CONST_OPTIONS} from '../../constants/element-constants';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() element: NameValueInterface;
  @Input() disabled: boolean;
  @Input() type: string;

  options = [];
  constructor() { }

  ngOnInit(): void {
    this.options = this.element.options.slice();
  }

  addStyle(): IStyles {
    const styles: IStyles = {};
    if (this.type === 'form') {
      Object.keys(this.element.styles).forEach((key, index) => {
        styles[key] = this.element.styles[key].value + this.element.styles[key].units;
      });
      return styles;
    }
  }

}
